import connectDB from "@/config/database";
import Message from "@/models/Message";
import { useCurrentSession } from "@/utils/useSession";
import { NextResponse } from "next/server";

//GET - /api/messages/unread-count
export const GET = async (request) => {
  try {
    await connectDB();

    const sessionUser = await useCurrentSession();

    if (!sessionUser || !sessionUser.userId) {
      return NextRequest.json("User ID is required!", { status: 401 });
    }

    const { userId } = sessionUser;

    const count = await Message.countDocuments({
      recipient: userId,
      read: false,
    });
    

    return NextResponse.json(count, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Something went wrong", { status: 500 });
  }
};
