import type { PostgrestError } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

import { createClient } from "@/src/utils/supabase/server";

export const dynamic = "force-dynamic";

type JsonObject = Record<string, unknown>;

function isJsonObject(value: unknown): value is JsonObject {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}

async function readJsonBody(request: NextRequest) {
    try {
        return (await request.json()) as unknown;
    } catch {
        return null;
    }
}

function getAdminId(request: NextRequest) {
    return request.nextUrl.searchParams.get("id") ?? request.nextUrl.searchParams.get("admin_id");
}

function errorResponse(error: PostgrestError) {
    const statusByCode: Record<string, number> = {
        "23503": 409,
        "23505": 409,
        "22P02": 400,
        PGRST116: 404,
    };

    return NextResponse.json(
        {
            error: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint,
        },
        { status: statusByCode[error.code] ?? 500 },
    );
}

async function getSupabase() {
    const cookieStore = await cookies();

    return createClient(cookieStore);
}

export async function GET(request: NextRequest) {
    const supabase = await getSupabase();
    const adminId = getAdminId(request);

    if (adminId) {
        const { data, error } = await supabase
            .from("admins")
            .select("*")
            .eq("admin_id", adminId)
            .single();

        if (error) {
            return errorResponse(error);
        }

        return NextResponse.json({ data });
    }

    const { data, error } = await supabase
        .from("admins")
        .select("*")
        .order("admin_id", { ascending: true });

    if (error) {
        return errorResponse(error);
    }

    return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
    const body = await readJsonBody(request);

    if (!isJsonObject(body)) {
        return NextResponse.json({ error: "JSON body required" }, { status: 400 });
    }

    const hashPassword = typeof body.password === "string"
        ? await bcrypt.hash(body.password, 10)
        : body.hash_password;

    if (!hashPassword) {
        return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    const supabase = await getSupabase();
    const { data, error } = await supabase
        .from("admins")
        .insert({
            name: body.name,
            email: body.email,
            hash_password: hashPassword,
        })
        .select("*")
        .single();

    if (error) {
        return errorResponse(error);
    }

    return NextResponse.json({ data }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
    const body = await readJsonBody(request);

    if (!isJsonObject(body)) {
        return NextResponse.json({ error: "JSON body required" }, { status: 400 });
    }

    const adminId = getAdminId(request) ?? String(body.admin_id ?? "");

    if (!adminId) {
        return NextResponse.json({ error: "Missing id or admin_id" }, { status: 400 });
    }

    const payload: JsonObject = {};

    if (body.name !== undefined) payload.name = body.name;
    if (body.email !== undefined) payload.email = body.email;
    if (typeof body.password === "string") {
        payload.hash_password = await bcrypt.hash(body.password, 10);
    } else if (body.hash_password !== undefined) {
        payload.hash_password = body.hash_password;
    }

    if (Object.keys(payload).length === 0) {
        return NextResponse.json({ error: "No valid fields provided" }, { status: 400 });
    }

    const supabase = await getSupabase();
    const { data, error } = await supabase
        .from("admins")
        .update(payload)
        .eq("admin_id", adminId)
        .select("*")
        .single();

    if (error) {
        return errorResponse(error);
    }

    return NextResponse.json({ data });
}

export async function PUT(request: NextRequest) {
    return PATCH(request);
}

export async function DELETE(request: NextRequest) {
    const body = await readJsonBody(request);
    const adminId = getAdminId(request) ?? (isJsonObject(body) ? String(body.admin_id ?? body.id ?? "") : "");

    if (!adminId) {
        return NextResponse.json({ error: "Missing id or admin_id" }, { status: 400 });
    }

    const supabase = await getSupabase();
    const { data, error } = await supabase
        .from("admins")
        .delete()
        .eq("admin_id", adminId)
        .select("*")
        .single();

    if (error) {
        return errorResponse(error);
    }

    return NextResponse.json({ data });
}
