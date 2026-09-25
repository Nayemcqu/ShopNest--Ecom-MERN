import express from "express";
import { admin } from "../middleware/adminMiddleware.js";
import { registerUser, loginUser, getUsers,logout,getMe } from "../controller/authController.js";
import { protect } from "../middleware/authMiddleware.js";
const router=express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/users",protect,admin,getUsers);
router.get("/logout",logout);
router.get("/me",protect,getMe);
export default router ;