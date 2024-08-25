import connectDB from "@/config/database";
import User from "@/models/User";
import { useCurrentSession } from "@/utils/useSession";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export const POST = async (request) => {
  try {
    await connectDB();

    const { propertyId } = await request.json();

    const session = await useCurrentSession();
    if (!session || !session.userId) {
      return NextResponse.json("User Id is required", { status: 401 });
    }

    const { userId } = session;

    const user = await User.findOne({ _id: userId });

    let isBookmarked = user.bookmarks.includes(propertyId);

    return NextResponse.json({isBookmarked }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
