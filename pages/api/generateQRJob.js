// pages/api/generateQRJob.js
import { Queue } from "quirrel/next";
import QRStyle from "../../models/QRStyle";
import QR from "@/models/qr";
import { Types } from 'mongoose';
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const qrJob = async (jobData) => {
  try {
    const { userId, url, style } = jobData;


    // Check if style is a valid ObjectId
    if (!Types.ObjectId.isValid(style)) {
      console.error("Invalid style id");
      return;
    }

    const qrStyle = await QRStyle.findOne({ _id: style });

    if (!qrStyle) {
      console.error("Style not found");
      return;
    }

    const output_uri = await replicate.run(
      "dannypostma/cog-visual-qr:7653601d0571fa6342ba4fa93a0962adebd1169e9e2329eefeb5729cac645d42",
      {
        input: {
          qr_code_content: url,
          prompt: qrStyle.prompt,
          strength: qrStyle.strength,
          controlnet_conditioning_scale: qrStyle.controlnet_conditioning_scale,
          guidance_scale: qrStyle.guidance_scale,
          negative_prompt: qrStyle.negative_prompt
        }
      }
    );

    const qr = new QR({
        input_url: url,
        output_url: output_uri,
        style: qrStyle.name,
        creator: userId  // Use userId directly
    });

    await qr.save();
    console.log("QR saved successfully!");

  } catch (error) {
    console.error("Error in QR job:", error.message);
  }
};

export default Queue("api/generateQRJob", qrJob);
