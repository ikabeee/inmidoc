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

function getDocumentId(request: NextRequest) {
    return request.nextUrl.searchParams.get("id") ?? request.nextUrl.searchParams.get("document_id");
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
    const documentId = getDocumentId(request);

    if (documentId) {
        const { data, error } = await supabase
            .from("requirement_documents")
            .select("*")
            .eq("document_id", documentId)
            .single();

        if (error) {
            return errorResponse(error);
        }

        return NextResponse.json({ data });
    }

    const { data, error } = await supabase
        .from("requirement_documents")
        .select("*")
        .order("document_id", { ascending: true });

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
        .from("requirement_documents")
        .insert({
            procedure_id: body.procedure_id,
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

    const documentId = getDocumentId(request) ?? String(body.document_id ?? "");

    if (!documentId) {
        return NextResponse.json({ error: "Missing id or document_id" }, { status: 400 });
    }

    const payload: JsonObject = {};

    if (body.procedure_id !== undefined) payload.procedure_id = body.procedure_id;
    if (body.name !== undefined) payload.name = body.name;

    if (Object.keys(payload).length === 0) {
        return NextResponse.json({ error: "No valid fields provided" }, { status: 400 });
    }

    const supabase = await getSupabase();
    const { data, error } = await supabase
        .from("requirement_documents")
        .update(payload)
        .eq("document_id", documentId)
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
    const documentId = getDocumentId(request) ?? (isJsonObject(body) ? String(body.document_id ?? body.id ?? "") : "");

    if (!documentId) {
        return NextResponse.json({ error: "Missing id or document_id" }, { status: 400 });
    }

    const supabase = await getSupabase();
    const { data, error } = await supabase
        .from("requirement_documents")
        .delete()
        .eq("document_id", documentId)
        .select("*")
        .single();

    if (error) {
        return errorResponse(error);
    }

    return NextResponse.json({ data });
}
