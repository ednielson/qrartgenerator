import fetch from 'node-fetch';
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const { input_url, qrId } = req.body;

    // Call the shortenUrl API
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
    
    // Get the shortened URL
    const shortUrl = await shortURL(input_url);
    console.log(shortUrl);

    // Call the replicate API
    const output = replicate.predictions.create(
      {
        version: "7653601d0571fa6342ba4fa93a0962adebd1169e9e2329eefeb5729cac645d42",
        input: {
          qr_code_content: shortUrl
        },
        webhook: `https://qrart.ai/api/webhook/replicate?qrId=${qrId}`, // Use qrId here
        webhook_events_filter: ["completed"],
      }
    );

    // If everything went well, return a 200 status code and the output from the Replicate API
    return res.status(200).json({ output: output });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
}