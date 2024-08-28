import connectDB from "@/config/database";
import Message from "@/models/Message";
import { useCurrentSession } from "@/utils/useSession";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

//GET - /api/messages
export const GET = async (request) => {
  try {
    await connectDB();
    const sessionUser = await useCurrentSession();

    if (!sessionUser || !sessionUser.user) {
      return NextResponse.json(
        { message: "You must be logged in!" },
        { status: 401 }
      );
    }

    const { userId } = sessionUser;
    const messages = await Message.find({ recipient: userId })
      .populate("sender", "username")
      .populate("property", "name");

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};

//POST - /api/messages
export const POST = async (request) => {
  try {
    await connectDB();
    const { name, email, phone, message, property, recipient } =
      await request.json();

    const sessionUser = await useCurrentSession();

    if (!sessionUser || !sessionUser.user) {
      return NextResponse.json(
        { message: "You must be logged in!" },
        { status: 401 }
      );
    }

    const { user } = sessionUser;

    if (user.id === recipient) {
      return NextResponse.json(
        { message: "Cannot send a message to self" },
        { status: 400 }
      );
    }

    const newMessage = new Message({
      name,
      sender: user.id,
      recipient,
      phone,
      email,
      property,
      body: message,
    });

    await newMessage.save();

    return NextResponse.json({ message: "Message sent" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
