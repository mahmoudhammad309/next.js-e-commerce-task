import { NextResponse } from 'next/server';
import axios from 'axios';
import { getSession } from '@/session';


const DB_API_URL = 'http://localhost:5000/products';

export async function GET() {
    const user = await getSession();
    console.log({user})
    if (!user) {
        // Redirect to login if the session is not available
        return NextResponse.json(
            { message: 'Unauthorized: Redirect to login' },
            { status: 401 }
          );
      }
  try {
    const response = await axios.get(DB_API_URL);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching products from database:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}