import { Queue } from "quirrel/next";
import { getSession } from "next-auth/react";
import User from "@/models/User";
import { Types } from 'mongoose';

// Create a queue
const qrQueue = Queue("api/generateQRJob", async ({ userId, url, style }) => {
  // This is where you'd put the logic that should be executed when the job runs.
  // For now, it's just a placeholder.
  console.log(`Running job for user ${userId} with url ${url} and style ${style}`);
});

export default async function handler(req, res) {
  try {
    const session = await getSession({ req });
    
    const user = await User.findOneAndUpdate(
      { _id: session?.user?.id, credits: { $gte: 1 } },
      { $inc: { credits: -1 } },
      { new: true } // returns the updated user
    );
    
    if (!user) {
      return res.status(400).json({ success: false, error: "Not enough credits" });
    }

   

    const { url, style } = req.query;

    if (!Types.ObjectId.isValid(style)) {
      return res.status(400).json({ success: false, error: "Invalid style id" });
    }

    // Use the enqueue method on the created queue
    await qrQueue.enqueue({ 
      userId: session?.user?.id, 
      url: url, 
      style: style 
    });

    // Redirect to the dashboard
    res.redirect('/dashboard?from=create-qr');

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}