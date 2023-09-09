import connectMongo from "@/libs/mongoose";
import QRStyle from "@/models/QRStyle";

export default async function handler(req, res) {
  const { method } = req;

  await connectMongo();

  switch (method) {
    case "GET":
      try {
        const styles = await QRStyle.find({});
        return res.status(200).json(styles);
      } catch (e) {
        console.error(e);
        return res.status(500).json({ error: e.message });
      }

    default:
      return res.status(404).json({ error: "Unknown request type" });
  }
}