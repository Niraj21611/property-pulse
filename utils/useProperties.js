//fetch all properties
async function fetchProperties() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`,
      { cache: "no-cache" }
    );
    // const res = await fetch("http://localhost:3000/api/properties");
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

//fetch single property
async function fetchProperty(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/properties/${id}`,
      { cache: "no-cache" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export { fetchProperties, fetchProperty };
