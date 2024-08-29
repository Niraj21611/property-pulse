import connectDB from "@/config/database";
import Property from "@/models/Property";
import { NextResponse } from "next/server";

//GET - /api/properties/featured
export const GET = async () => {
  try {
    await connectDB();
    const properties = await Property.find({
      is_featured: true,
    });
    return NextResponse.json(properties, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Something went wrong", { status: 500 });
  }
};
