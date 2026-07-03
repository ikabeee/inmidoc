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

function getTicketId(request: NextRequest) {
    return request.nextUrl.searchParams.get("id") ?? request.nextUrl.searchParams.get("ticket_id");
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
    const ticketId = getTicketId(request);

    if (ticketId) {
        const { data, error } = await supabase
            .from("tickets")
            .select("*")
            .eq("ticket_id", ticketId)
            .single();

        if (error) {
            return errorResponse(error);
        }

        return NextResponse.json({ data });
    }

    const { data, error } = await supabase
        .from("tickets")
        .select("*")
        .order("ticket_id", { ascending: true });

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
        .from("tickets")
        .insert({
            admin_id: body.admin_id,
            title: body.title,
            description: body.description,
            status: body.status,
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

    const ticketId = getTicketId(request) ?? String(body.ticket_id ?? "");

    if (!ticketId) {
        return NextResponse.json({ error: "Missing id or ticket_id" }, { status: 400 });
    }

    const payload: JsonObject = {};

    if (body.admin_id !== undefined) payload.admin_id = body.admin_id;
    if (body.title !== undefined) payload.title = body.title;
    if (body.description !== undefined) payload.description = body.description;
    if (body.status !== undefined) payload.status = body.status;

    if (Object.keys(payload).length === 0) {
        return NextResponse.json({ error: "No valid fields provided" }, { status: 400 });
    }

    const supabase = await getSupabase();
    const { data, error } = await supabase
        .from("tickets")
        .update(payload)
        .eq("ticket_id", ticketId)
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
    const ticketId = getTicketId(request) ?? (isJsonObject(body) ? String(body.ticket_id ?? body.id ?? "") : "");

    if (!ticketId) {
        return NextResponse.json({ error: "Missing id or ticket_id" }, { status: 400 });
    }

    const supabase = await getSupabase();
    const { data, error } = await supabase
        .from("tickets")
        .delete()
        .eq("ticket_id", ticketId)
        .select("*")
        .single();

    if (error) {
        return errorResponse(error);
    }

    return NextResponse.json({ data });
}
