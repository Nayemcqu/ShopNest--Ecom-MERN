import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./route/authRoutes.js";
dotenv.config();
await connectDB(); // Wait for the database connection to be established
const app = express();

app.get("/", (req, res) => {
  res.send("shop nest backend is running");
});

app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
