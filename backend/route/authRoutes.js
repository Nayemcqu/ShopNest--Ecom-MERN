import express from "express";
import { admin } from "../controller/adminMiddleware.js";
import { registerUser, loginUser, getUsers } from "../controller/authController.js";
import { protect } from "../middleware/authMiddleware.js";
const router=express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/users",protect,admin,getUsers);

export default router ;