import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";
import { getOrders,getOrderbyId,updateorderStatus,createNewOrder} from "../controller/orderController.js"

const router=express.Router();

router.route('/').post(protect,createNewOrder).get(protect,admin,getOrders);
router.route('/myOrders').get(protect,getOrderbyId);
router.route('/:id/status').put(protect,admin,updateorderStatus);

export default router;
 