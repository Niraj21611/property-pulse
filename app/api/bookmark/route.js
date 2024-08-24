import connectDB from "@/config/database";
import Property from "@/models/Property";
import User from "@/models/User";
import { useCurrentSession } from "@/utils/useSession";
import { NextResponse } from "next/server";

//GET - /api/bookmark
export const GET = async (request) => {
  try {
    await connectDB();

    const session = await useCurrentSession();
    if (!session || !session.userId) {
      return NextResponse.json("User Id is required", { status: 401 });
    }

    const { userId } = session;

    const user = await User.findOne({ _id: userId });

    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });
    return NextResponse.json(bookmarks, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};

// POST - /api/bookmark
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
    let message;

    if (isBookmarked) {
      user.bookmarks.pull(propertyId);
      message = "Bookmark removed successfully";
      isBookmarked = false;
    } else {
      user.bookmarks.push(propertyId);
      message = "Bookmark added successfully";
      isBookmarked = true;
    }

    await user.save();

    return NextResponse.json({ message, isBookmarked }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
