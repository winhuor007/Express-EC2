// src/database/connection.ts
import configs from "../config";
import mongoose from "mongoose";

async function connectToMongoDB() {
  try {
    await mongoose.connect(configs.mongodbUrl);
    console.log("MongoDB is connected!!!");
  } catch (error) {
    console.error(`connectToMongoDB() method error: `, error);
    throw error;
  }
}

export default connectToMongoDB;
