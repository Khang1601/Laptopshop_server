import express from "express";
const router = express.Router();


import authenticationController from "../../controllers/authentication.controller.js";

router.post("/login", authenticationController.login)
router.post("/:token", authenticationController.checkToken)
router.post("/", authenticationController.register)

router.get("/email-confirm/:token",authenticationController.emailConfirm)

// router.get("/email-confirm-user/:token",authenticationController.emailConfirm)

export default router;