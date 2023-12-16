import express from "express";
const router = express.Router();

import categoryController from "../../controllers/category.controller.js";
import productController from "../../controllers/product.controller.js";


router.post("/seed", categoryController.seedData)


import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/imgs/categories/')
    },
    filename: function (req, file, cb) {
      cb(null, `category_${Date.now() * Math.random()}.${file.mimetype.split('/')[1]}`)
    }
  })
  
  const upload = multer({ storage: storage })
router.post("/",upload.single("avatar"), categoryController.create)
export default router;