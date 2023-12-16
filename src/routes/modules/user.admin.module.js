import express from "express";
const router = express.Router();

// import categoryController from "../../controllers/category.controller.js";
import userController from "../../controllers/user.controller.js";


import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/imgs/users/')
    },
    filename: function (req, file, cb) {
      cb(null, `user_${Date.now() * Math.random()}.${file.mimetype.split('/')[1]}`)
    }
  })
  
  const upload = multer({ storage: storage })
router.post("/",upload.single("avatar"), userController.create)
export default router;