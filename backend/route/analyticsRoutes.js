import express from "express"
import { admin } from "../middleware/adminMiddleware.js"
import { protect } from "../middleware/authMiddleware.js"
import {getAdminStat} from "../controller/analyticsController.js"


const router=express.Router();

router.get("/",protect,admin,getAdminStat);

export default router;
