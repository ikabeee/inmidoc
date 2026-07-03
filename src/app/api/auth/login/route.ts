import bcrypt from "bcrypt";
import { createHmac } from "node:crypto";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import { createClient } from "@/src/utils/supabase/server";

export const dynamic = "force-dynamic";

type JsonObject = Record<string, unknown>;

type Admin = {
  admin_id: number;
  name: string;
  email: string;
  hash_password: string;
};

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

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET ?? process.env.SUPABASE_SECRET_KEY;

  if (!secret) {
    throw new Error("Missing AUTH_SECRET");
  }

  return secret;
}

function encodeBase64Url(value: string) {
  return Buffer.from(value).toString("base64url");
}

function signSession(admin: Admin) {
  const now = Math.floor(Date.now() / 1000);
  const header = encodeBase64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = encodeBase64Url(
    JSON.stringify({
      sub: String(admin.admin_id),
      email: admin.email,
      name: admin.name,
      iat: now,
      exp: now + 60 * 60 * 8,
    }),
  );
  const signature = createHmac("sha256", getAuthSecret())
    .update(`${header}.${payload}`)
    .digest("base64url");

  return `${header}.${payload}.${signature}`;
}

export async function POST(request: NextRequest) {
  const body = await readJsonBody(request);

  if (!isJsonObject(body) || typeof body.email !== "string" || typeof body.password !== "string") {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 },
    );
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: admin, error } = await supabase
    .from("admins")
    .select("admin_id, name, email, hash_password")
    .eq("email", body.email)
    .single<Admin>();

  if (error || !admin) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const passwordMatches = await bcrypt.compare(body.password, admin.hash_password);

  if (!passwordMatches) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signSession(admin);
  const response = NextResponse.json({
    data: {
      admin: {
        admin_id: admin.admin_id,
        name: admin.name,
        email: admin.email,
      },
      token,
    },
  });

  response.cookies.set("admin_session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
