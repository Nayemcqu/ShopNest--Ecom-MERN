import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    createCheckoutSession,
    createOrderAfterPayment
} from "../controller/paymentController.js";

 const router = express.Router();

router.post(
    "/create-checkout-session",
    protect,
    createCheckoutSession
);

router.post(
    "/create-order",
    protect,
    createOrderAfterPayment
);
export default router;