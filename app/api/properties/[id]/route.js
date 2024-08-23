import connectDB from "@/config/database";
import Property from "@/models/Property";
import { useCurrentSession } from "@/utils/useSession";
import { NextResponse } from "next/server";

//GET - api/properties/:id
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

//DELETE - api/properties/:id
export const DELETE = async (request, { params }) => {
  try {
    const propertyId = params.id;

    const sessionUser = await useCurrentSession();

    if (!sessionUser || !sessionUser.userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 401 }
      );
    }

    const { userId } = sessionUser;

    await connectDB();
    const property = await Property.findById(params.id);
    if (!property) {
      return NextResponse.json(
        { error: "Property Not found" },
        { status: 404 }
      );
    }

    if (property.owner.toString() !== userId) {
      return NextResponse({ message: "Unauthorized" }, { status: 401 });
    }

    await property.deleteOne();

    return NextResponse.json({message: "Property Deleted"}, { status: 200 });
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
