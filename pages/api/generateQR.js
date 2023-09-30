import connectMongo from "@/libs/mongoose";
import User from "@/models/user";
import QR from "@/models/qr";
import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { input_url, style, creator } = req.query;
  
        // Connect to MongoDB
        await connectMongo();

        // Find the user and deduct a credit
        const user = await User.findById(creator);
        if (!user) {
            return res.status(400).json({ success: false, error: "User not found" });
        }
        if (typeof user.credits !== 'number' || user.credits < 1) {
            return res.status(400).json({ success: false, error: "Not enough credits" });
        }
        await User.findByIdAndUpdate(
            user._id,
            { $inc: { credits: -1 } },
            { new: true } // returns the updated user
        );
  
        // Create a new document
        const qr = new QR({
            input_url,
            style,
            creator,
            output_url: '/loading.gif', // Placeholder image
        });
  
        try {
            // Save the document
            const savedQRCode = await qr.save();
  
            // Call the replicate API
            const response = await fetch(`${process.env.SITE_URL}/api/replicate`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
                body: JSON.stringify({ 
                    qrId: savedQRCode._id, 
                    input_url: input_url, 
                    style: style 
                })
            });
            const data = await response.json();
            if (!Response.ok) {
                console.error(`Replicate API responded with status ${Response.status}`);
            }

            res.redirect('/dashboard?from=create-qr');
        
            res.status(200).json(savedQRCode);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
}