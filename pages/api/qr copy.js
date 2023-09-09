//import { connectToDB } from "@utils/database";
//import QR from "@models/qr";
//import QRStyle from "@models/QRStyle";
//import User from "@models/user"; // Import the User model
import Replicate from "replicate";


const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

/*
async function shortenUrl(input_url) {
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
*/

export default async function handler(req, res) {

  //const { userId, input_url, styleId } = await req.json();

  try {
  //  await connectToDB();
/*
    const selectedStyle = await QRStyle.findOne({ _id: styleId });
    if (!selectedStyle) {
      throw new Error("Style not found.");
    }
    */
  //  const shortUrl = await shortenUrl(input_url);

    const output_uri = await replicate.run(
      "dannypostma/cog-visual-qr:7653601d0571fa6342ba4fa93a0962adebd1169e9e2329eefeb5729cac645d42",
      {
        input: {
          qr_code_content: 'https://google.be'
        }
      }
    );
   /*
    const newQR = new QR({
      creator: userId,
      input_url,
      output_url: output_uri,
      style: selectedStyle.name
    });

    await newQR.save();

    // Deduct one credit from user's credits after generating the QR code
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found.");
    }
    user.credits -= 1;
    await user.save();
*/
    // Return a success response with status code 201
    res.status(201).json({ success: true });

  } catch (error) {
    // Return an error response with status code 500
    res.status(500).json({ success: false, error: error.message });
  }
};