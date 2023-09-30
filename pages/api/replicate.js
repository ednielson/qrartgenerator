import fetch from 'node-fetch';
import Replicate from "replicate";
import QRStyle from '@/models/QRStyle';
import connectMongo from "@/libs/mongoose";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

async function shortURL(input_url) {
  const data = {
    "domain": "l.qrart.ai",
    "originalURL": input_url
  };

  const response = await fetch('https://api.short.io/links/public', {
    method: 'post',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': 'pk_wmXVSwBDKlH0VGcx'
    },
    body: JSON.stringify(data)
  });

  const responseData = await response.json();
  return responseData.shortURL;
}

export default async function handler(req, res) {
  try {
    // Connect to the database
    await connectMongo();

    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const { input_url, qrId, style } = req.body;

    const shortUrl = await shortURL(input_url);
    console.log(shortUrl);
    
    const qrStyle = await QRStyle.findOne({ _id: style });

    if (!qrStyle) {
      return res.status(404).json({ message: 'Style not found' });
    }

    const output = replicate.predictions.create(
      {
        version: "7653601d0571fa6342ba4fa93a0962adebd1169e9e2329eefeb5729cac645d42",
        input: {
          qr_code_content: shortUrl,
          prompt: qrStyle.prompt,
          strength: qrStyle.strength,
          controlnet_conditioning_scale: qrStyle.controlnet_conditioning_scale,
          guidance_scale: qrStyle.guidance_scale,
          negative_prompt: qrStyle.negative_prompt
        },
        webhook: `https://qrart.ai/api/webhook/replicate?qrId=${qrId}`,
        webhook_events_filter: ["completed"],
      }
    );

    return res.status(200).json({ output: output });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
}