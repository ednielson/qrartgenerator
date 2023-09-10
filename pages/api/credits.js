import connectMongo from "@/libs/mongoose";
import User from "@/models/user";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  await connectMongo();
  const session = await getSession({ req });
  const userData = await User.findOne({ _id: session.user.id });
  res.status(200).json({ credits: userData.credits });
}
