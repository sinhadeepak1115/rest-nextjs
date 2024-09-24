import { NextResponse } from "next/server";
import User from "@/lib/modals/user";
import connectDB from "@/lib/db";
import { Types } from "mongoose";

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

export const POST = async (request: Request) => {
  try {
    await connectDB();
    const { email, username, password } = await request.json();
    const user = new User({
      email: email,
      username: username,
      password: password,
    });
    await user.save();
    return new NextResponse(JSON.stringify(user), { status: 200 });
    //eslint-disable-next-line
  } catch (error: any) {
    return new NextResponse("Error in creating user" + error.message, {
      status: 500,
    });
  }
};

export const PATCH = async (request: Request) => {
  try {
    const { userId, newUsername } = await request.json();
    await connectDB();
    if (!userId || !newUsername) {
      return new NextResponse("Invalid data", { status: 400 });
    }
    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse("Invalid user id", { status: 400 });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username: newUsername },
      { new: true },
    );
    if (!updatedUser)
      return new NextResponse(
        JSON.stringify({ message: "User not found in database" }),
        { status: 400 },
      );
    return new NextResponse(
      JSON.stringify({ message: "User is updated", user: updatedUser }),
      { status: 200 },
    );
    //eslint-disable-next-line
  } catch (error: any) {
    return new NextResponse("Error in updating user" + error.message, {
      status: 500,
    });
  }
};

export const DELETE = async (request: Request) => {
  try {
    const { userId } = await request.json();
    connectDB();
    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "ID or the username not found" }),
        { status: 400 },
      );
    }
    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid user id" }), {
        status: 400,
      });
    }
    const deletedUser = await User.findByIdAndDelete(userId);
    return new NextResponse(
      JSON.stringify({
        message: "User deleted successfuly",
        user: deletedUser,
      }),
      { status: 200 },
    );
    //eslint-disable-next-line
  } catch (error: any) {
    return new NextResponse("Error in updating user" + error.message, {
      status: 500,
    });
  }
};
