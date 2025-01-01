import { NextResponse } from "next/server";
import axiosInstance from "../../../utils/axios";
import axios from "axios";
import bcrypt from "bcryptjs";

interface SignupRequestBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { name, email, password }: SignupRequestBody = await request.json();

    console.log("Received signup data:", { name, email });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Send a POST request to JSON-SERVER
    const response = await axiosInstance.post("/users", {
      name,
      email,
      password: hashedPassword,
      role: "user",
      status: "active"
    });

    console.log("User created successfully:", response.data);

    // Return the created user
    return NextResponse.json({
      user: response.data,
      msg: "User created successfully",
    });
  } catch (error: unknown) {
    console.error("Error signing up:", error);

    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        { error: error.response.data || "Error creating user" },
        { status: error.response.status || 500 }
      );
    }

    // Handle generic server error
    return NextResponse.json(   
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
