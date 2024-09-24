import { NextResponse } from "next/server";
import User from "@/lib/modals/user";
import connectDB from "@/lib/db";

export const GET = async () => {
  try {
    await connectDB();
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });
    //eslint-disable-next-line
  } catch (error: any) {
    return new NextResponse("Error in fetching users" + error.message, {
      status: 500,
    });
  }
};
