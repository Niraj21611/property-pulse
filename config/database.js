import mongoose, { mongo } from "mongoose";

let connected = false;

async function connectDB() {
  mongoose.set("strictQuery", true);
  if (connected) {
    console.log("Database already connected.....");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    connected = true;
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
}

export default connectDB;