import mongoose from 'mongoose';
import User from './src/models/User.models.js';
import dotenv from 'dotenv';
dotenv.config();

async function checkIndex() {
  try {
    console.log("Connecting to database using process.env.DB_URL...");
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected! Fetching indexes...");
    const indexes = await User.collection.indexes();
    console.log(indexes);
  } catch (error) {
    console.error("Connection failed:", error);
  } finally {
    mongoose.disconnect();
  }
}
checkIndex();
