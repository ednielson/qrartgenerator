import QR from "@/models/qr";

export default async function handler(req, res) {
  try {
    const { qrId } = req.query;
    const { output_url } = req.body;

    await QR.findByIdAndUpdate(qrId, { output_url });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}