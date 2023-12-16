import express from "express";
const router = express.Router();

import categoryController from "../../controllers/category.controller.js";
router.get("/", categoryController.findMany)


export default router;