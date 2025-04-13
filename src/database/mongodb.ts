import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) {
    return;
  }
  try {
    await mongoose.connect(String(process.env.DB_URL));
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};
