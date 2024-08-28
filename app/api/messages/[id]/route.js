import connectDB from "@/config/database";
import Message from "@/models/Message";
import { useCurrentSession } from "@/utils/useSession";
import { NextRequest, NextResponse } from "next/server";

//PUT - /api/messages/:id
export const PUT = async (request, { params }) => {
  const { id } = params;
  try {
    await connectDB();

    const sessionUser = await useCurrentSession();

    if (!sessionUser || !sessionUser.userId) {
      return NextRequest.json("User ID is required!", { status: 401 });
    }

    const { userId } = sessionUser;

    const message = await Message.findById(id);
    if (!message)
      return NextResponse.json("Message Not Found", { status: 404 });

    if (message.recipient.toString() !== userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    message.read = !message.read;

    await message.save();

    return NextResponse.json(message, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Something went wrong", { status: 500 });
  }
};

//DELETE - /api/messages/id
export const DELETE = async (request, { params }) => {
  const { id } = params;
  try {
    await connectDB();

    const sessionUser = await useCurrentSession();

    if (!sessionUser || !sessionUser.userId) {
      return NextRequest.json("User ID is required!", { status: 401 });
    }

    const { userId } = sessionUser;

    const message = await Message.findById(id);
    if (!message)
      return NextResponse.json("Message Not Found", { status: 404 });

    if (message.recipient.toString() !== userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    await message.deleteOne();

    return NextResponse.json("Successfully Deleted message", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Something went wrong", { status: 500 });
  }
};
