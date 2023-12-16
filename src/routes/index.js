import express from "express";
const router = express.Router();

import v1Api from './v1Api.js';
import adminApi from './adminApi.js';

router.use("/v1", v1Api)
router.use("/admin", adminApi)
export default router;