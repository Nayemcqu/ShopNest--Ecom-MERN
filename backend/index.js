import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./route/authRoutes.js";
import productRoutes from "./route/productRoutes.js"
import orderRoutes from "./route/orderRoutes.js"
import paymentRoutes from "./route/paymentRoutes.js"
import analyticsRoutes from "./route/analyticsRoutes.js"
dotenv.config();
await connectDB(); // Wait for the database connection to be established
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get("/", (req, res) => {
  res.send("shop nest backend is running");
});

app.use('/api/auth', authRoutes);
app.use('/api/products',productRoutes);
app.use('/api/payment',paymentRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/analytics',analyticsRoutes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
