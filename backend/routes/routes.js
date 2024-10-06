import express from "express";
import { google, login, logout, signup, verifySignup } from "../controller/controller.js";

const router =  express.Router();

router.post("/signup", signup);

router.post('/verifySignup', verifySignup);

router.post("/login", login);

router.post("/logout", logout);

router.post('/google', google)

export default router;
