import connectMongo from "@/libs/mongoose";
import QR from "@/models/qr";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  await connectMongo();
  const session = await getSession({ req });
  const qrData = await QR.find({ creator: session.user.id });
  res.status(200).json(qrData);
}