import mongoose from 'mongoose';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      mongoose: { conn: mongoose.Connection | null; promise: Promise<mongoose.Mongoose> | null };
    }
  }
}

// Define the MongoDB connection string
const DATABASE_URL = process.env.DATABASE_URL || '';

if (!DATABASE_URL) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Define a global variable to cache the connection
let cached: { conn: mongoose.Connection | null; promise: Promise<mongoose.Mongoose> | null } = (global as unknown as NodeJS.Global).mongoose;

if (!cached) {
  cached = (global as unknown as NodeJS.Global).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => mongoose);
  }

  try {
    await cached.promise;
    cached.conn = mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }

  return cached.conn;
}

export { connectDB };
