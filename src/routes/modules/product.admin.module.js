import express from "express";
const router = express.Router();

//================moi tao file nay
import productController from "../../controllers/product.controller.js";



import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/imgs/products/')
    },
    filename: function (req, file, cb) {
      cb(null, `product_${Date.now() * Math.random()}.${file.mimetype.split('/')[1]}`)
    }
  })
  
  const upload = multer({ storage: storage })
router.post("/",upload.single("avatar"), productController.create)
export default router;