import connectDB from "@/config/database";
import Property from "@/models/Property";
import { NextResponse } from "next/server";

//GET - api/properties/id
export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const property = await Property.findById(params.id);
    if (!property) {
      return NextResponse.json(
        { error: "Property Not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(property, { status: 200 });
    // return new Response(JSON.stringify(properties), {
    //   status: 200,
    // });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
