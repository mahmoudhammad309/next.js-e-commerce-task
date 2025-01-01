import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axiosInstance from "../../../utils/axios";
import { setSession } from "@/session";

const SECRET_KEY = process.env.JWT_SECRET;

interface LoginRequestBody {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const { email, password }: LoginRequestBody = await request.json();

    // Fetch user data from the backend or database
    const response = await axiosInstance.get("/users");
    const users = response.data; // Assume it returns a list of users

    // Find the user with the matching email
    const user = users.find((u: { email: string }) => u.email === email);

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Compare the hashed password with the provided password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Check if SECRET_KEY is defined
    if (!SECRET_KEY) {
      throw new Error("JWT_SECRET is not defined");
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Return the token and user data
    console.log("******************")
    console.log({
      token,
      user: { id: user.id, email: user.email, role: user.role },
  })
    console.log("******************")
    await setSession({ id: user.id, email: user.email, role: user.role, name: user.name });
    return NextResponse.json({
      token,
      user: { id: user.id, email: user.email, role: user.role, name: user.name },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
