import { connectToDB } from "@utils/database";
import QRStyle from "@models/QRStyle.js";

export const GET = async (req) => {
    try {

        // Connect to MongoDB
        await connectToDB();

        // Fetch only the _id, name, and imagePath fields from the database
        const styles = await QRStyle.find({}, { _id: 1, name: 1, imagePath: 1 });

        // Check if styles are empty
        if (!styles || styles.length === 0) {
            return new Response(JSON.stringify({ success: false, message: "No styles found." }), { status: 404 });
        }

        // Send the fetched styles as response using the Response object
        return new Response(JSON.stringify(styles), { status: 200 });
    } catch (error) {
        // Handle the error and send an error response using the Response object
        console.error("Error fetching styles:", error);
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}