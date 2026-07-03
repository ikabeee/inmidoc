import type { PostgrestError } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

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

function getInstitutionId(request: NextRequest) {
    return request.nextUrl.searchParams.get("id") ?? request.nextUrl.searchParams.get("institution_id");
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
    const institutionId = getInstitutionId(request);

    if (institutionId) {
        const { data, error } = await supabase
            .from("institutions")
            .select("*")
            .eq("institution_id", institutionId)
            .single();

        if (error) {
            return errorResponse(error);
        }

        return NextResponse.json({ data });
    }

    const { data, error } = await supabase
        .from("institutions")
        .select("*")
        .order("institution_id", { ascending: true });

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

    const supabase = await getSupabase();
    const { data, error } = await supabase
        .from("institutions")
        .insert({
            name: body.name,
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

    const institutionId = getInstitutionId(request) ?? String(body.institution_id ?? "");

    if (!institutionId) {
        return NextResponse.json({ error: "Missing id or institution_id" }, { status: 400 });
    }

    const payload: JsonObject = {};

    if (body.name !== undefined) payload.name = body.name;

    if (Object.keys(payload).length === 0) {
        return NextResponse.json({ error: "No valid fields provided" }, { status: 400 });
    }

    const supabase = await getSupabase();
    const { data, error } = await supabase
        .from("institutions")
        .update(payload)
        .eq("institution_id", institutionId)
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
    const institutionId = getInstitutionId(request) ?? (isJsonObject(body) ? String(body.institution_id ?? body.id ?? "") : "");

    if (!institutionId) {
        return NextResponse.json({ error: "Missing id or institution_id" }, { status: 400 });
    }

    const supabase = await getSupabase();
    const { data, error } = await supabase
        .from("institutions")
        .delete()
        .eq("institution_id", institutionId)
        .select("*")
        .single();

    if (error) {
        return errorResponse(error);
    }

    return NextResponse.json({ data });
}
