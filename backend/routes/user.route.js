import express from "express";
import { register, login, logout, updateProfile } from "../models/controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", singleUpload, register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.post("/profile/update", isAuthenticated, singleUpload, updateProfile);

export default router;

