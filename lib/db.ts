import mongoose from "mongoose";

const MONOGODB_URI = process.env.MONGODB_URI;

const conncetDB = async () => {
  const connectionState = mongoose.connection.readyState;
  if (connectionState === 1) {
    console.log("DB is already connected");
    return;
  }
  if (connectionState === 2) {
    console.log("DB is connecting...");
    return;
  }
  try {
    await mongoose.connect(MONOGODB_URI || "");
    console.log("DB connected successfully");
  } catch (error) {
    console.log("DB connection failed");
    console.error(error);
    process.exit(1);
  }
};

export default conncetDB;
