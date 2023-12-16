import express from "express";
const router = express.Router();

import userController from "../../controllers/user.controller.js";
router.get("/", userController.findMany)

//--------
router.delete("/:userId", userController.delete)



export default router;