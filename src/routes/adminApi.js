import express from "express";
const router = express.Router();

import categoryModule from './modules/category.admin.module.js'


//---------
import productModule from './modules/product.admin.module.js'
import userModule from './modules/user.admin.module.js'


import adminMiddleware from "../middlewares/admin.middleware.js";

// router.use("/categories-seed",adminMiddleware.isAdmin, categoryModule)
router.use("/categories", categoryModule)



//----------
router.use("/products", productModule)

router.use("/users", userModule)





export default router;