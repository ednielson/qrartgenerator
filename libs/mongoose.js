import mongoose from "mongoose";
import user from "@/models/user";

const connectMongo = async () =>
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((e) => console.error("Mongoose Client Error: " + e.message));

export default connectMongo;
