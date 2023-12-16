import express from "express";
const router = express.Router();

import categoryModule from './modules/category.module.js'
import authenticationModule from './modules/authentication.module.js'
import productModule from './modules/product.module.js'
import receiptModule from './modules/receipt.module.js'


//--------
import userModule from './modules/user.module.js'

router.use("/categories", categoryModule)
router.use("/authen", authenticationModule)
router.use("/products", productModule)
router.use("/receipts", receiptModule)


//--------
// router.use("/products-item", productModule)
router.use("/users", userModule)





export default router;