import express from "express";
const router = express.Router();

import receiptController from "../../controllers/receipt.controller";

router.get("/:userId", receiptController.findManyBuyUserId)
router.post("/:userId/:productId", receiptController.addToCart)
router.post("/updateItemCart/:itemId/:newQuantity", receiptController.updateItemCart)
router.delete("/:receiptId/:itemId", receiptController.deleteItemCart)
router.patch("/purchase/:receiptId/:total", receiptController.purchase)
export default router;