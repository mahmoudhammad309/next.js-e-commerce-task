import { NextResponse } from 'next/server';
import axiosInstance from "../../../utils/axios";

export async function GET() {

    try {
        const response = await axiosInstance.get("/users");
        console.log(response.data)
        type User = { role: string };
        const users = response.data.filter((user: User) => user.role === 'user');

        return NextResponse.json(users);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}