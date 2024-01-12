import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL || "mongodb+srv://calegari:lauraamor4@cluster0.rz7m5.gcp.mongodb.net/solanatest?retryWrites=true&w=majority";

if (!DATABASE_URL) {
    throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
  }
  
  let cached = global.mongoose;
  
  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
  }
  
  async function connectDB() {
    if (cached.conn) {
      return cached.conn;
    }
  
    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
      };
  
      cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
        return mongoose;
      });
    }
    cached.conn = await cached.promise;
    return cached.conn;
  }
  
  export default connectDB;