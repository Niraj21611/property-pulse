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

    return NextResponse.json({ message: "Property Deleted" }, { status: 200 });
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

//PUT - api/properties/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const sessionUser = await useCurrentSession();
    if (!sessionUser || !sessionUser.user.id) {
      return NextResponse.json("User ID is required", { status: 401 });
    }

    const { id } = params;

    const { userId } = sessionUser;

    const formData = await request.formData();
    const amenities = formData.getAll("amenities");

    //Get property to update
    const existingProperty = await Property.findById(id);
    if (!existingProperty)
      return NextResponse.json(
        { message: "Property does not exist" },
        { status: 404 }
      );

    //verify Ownership
    if (existingProperty.owner.toString() !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        nightly: formData.get("rates.nightly"),
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
    };

    // Update Property in database

    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);


    return NextResponse.json(updatedProperty, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
