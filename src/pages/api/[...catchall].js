import app from "../../backend/app.js";
import connectDB from "../../backend/config/db.js";

export const config = {
     api: {
          externalResolver: true,
          bodyParser: false, // Disable Next.js body parser so Express/Multer can parse the body stream directly
     },
};

export default async function handler(req, res) {
     try {
          await connectDB();
     } catch (e) {
          console.error("Database connection failure in API handler:", e);
          return res.status(500).json({ error: "Database connection failure" });
     }
     return app(req, res);
}
