// pages/api/webhook/replicate.js
import QR from "@/models/qr";

export default async function handler(req, res) {
  const prediction = req.body;
  console.log("🪝 incoming webhook!", prediction.id);

  // Extract the qrId from the request URL
  const qrId = req.query.qrId;

  // Extract the output URL from the prediction
  const output = prediction.output;

  // Update the QR document in your database
  try {
    const updatedQR = await QR.findByIdAndUpdate(qrId, { output_url: output }, { new: true });
    console.log("Updated QR:", updatedQR);
  } catch (error) {
    console.error("Error updating QR:", error);
  }

  res.status(200).json({ success: true });
}