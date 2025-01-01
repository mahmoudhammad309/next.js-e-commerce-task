/* eslint-disable @typescript-eslint/no-explicit-any */
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.JWT_SECRET
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 hour")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    if (error instanceof Error && (error as any).code === "ERR_JWT_EXPIRED") {
      console.error("JWT expired:", error);
      throw new Error("Session expired. Please log in again.");
    }
    throw error;
  }
}

export async function setSession(user: any) {
  try {
    const expires = new Date(Date.now() + 60 * 60 * 24 * 1000);
    const session = await encrypt({ user, expires });

    (await cookies()).set("session", session, { expires, httpOnly: true });
  } catch (error) {
    console.log("Error setting session:", error);
  }
}


export async function getSession() {
  try {
    const session = (await cookies()).get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
  } catch (error) {
    console.log("Error getting session:", error);
    return null;
  }
}


export async function logout() {
  try {
    (await cookies()).set("session", "", { expires: new Date(0) });
  } catch (error) {
    console.log("Error during logout:", error);
  }
}

export async function updateSession(request: NextRequest) {
  try {
    const session = await request.cookies.get("session")?.value;
    if (!session) return;

    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 10 * 1000); 

    const res = NextResponse.next();

    // Set the updated session in a cookie
    res.cookies.set({
      name: "session",
      value: await encrypt(parsed),
      httpOnly: true,
      expires: parsed.expires,
    });

    return res;
  } catch (error) {
    console.log("Error updating session:", error);
    return NextResponse.next();
  }
}
