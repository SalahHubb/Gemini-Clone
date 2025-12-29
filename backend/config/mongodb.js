import mongoose from "mongoose";
import "dotenv/config";

const uri = process.env.MONGODB_URI;

const connectToDB = async () => {
  try {
    await mongoose.connect(uri, {
      bufferCommands: false,
    });
    console.log("connected to mongodb atlas");
  } catch (error) {
    console.log("mongodb connection failed: ", error.message);
  }
};

export default connectToDB;
