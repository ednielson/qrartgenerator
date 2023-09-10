// Import the Replicate library
import Replicate from "replicate";
// Import the database model for QRStyles
import QRStyle from "../../models/QRStyle";
import QR from "@/models/qr";
// Import mongoose ObjectId
import { Types } from 'mongoose';
import { getSession } from "next-auth/react";
import User from "@/models/user"; // Import the User model

// Create a new instance of Replicate with the API token from the environment variables
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Export the default async function handler
export default async function handler(req, res) {
  try {
    // Get the session
    const session = await getSession({ req });

    // Fetch the user from the database
    const user = await User.findById(session?.user?.id);

    // Check if the user has enough credits
    if (user.credits < 1) {
      return res.status(400).json({ success: false, error: "Not enough credits" });
    }

   // Deduct 1 credit from the user
    await User.updateOne(
      { _id: session?.user?.id },
      { $inc: { credits: -1 } }
    );

    // Extract the url and style from the query parameters
    const { url, style } = req.query;

    // Check if style is a valid ObjectId
    if (!Types.ObjectId.isValid(style)) {
      return res.status(400).json({ success: false, error: "Invalid style id" });
    }

    // Fetch the style from the database
    const qrStyle = await QRStyle.findOne({ _id: style });

    if (!qrStyle) {
      // If the style is not found, return a 404 status with an error message
      return res.status(404).json({ success: false, error: "Style not found" });
    }

    // Run the Replicate function with the specified model and input
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

    // Create a new QR document
    const qr = new QR({
      input_url: url,
      output_url: output_uri,
      style: qrStyle.name,
      creator: session?.user?.id  // Save the current user id in the creator field
    });

    // Save the QR document to the database
    await qr.save();

    // Redirect user to /dashboard
    res.writeHead(302, { Location: '/dashboard' });
    res.end();
  } catch (error) {
    // If there's an error, return a 500 status with the error message
    res.status(500).json({ success: false, error: error.message });
  }
}