import productModel from "../models/product.model.js";

export default {
    findMany: async function(req,res) {
        try {
            let {status, message, data} = await productModel.findMany();

            return res.status(status ? 200 : 213).json({
                message,
                data
            })
        }catch(err) {
            return res.status(500).json({
                message: "Controller Err"
            })
        }
    },
    //--------------
    create: async function(req,res) {
        console.log("da vao")
        console.log("da vao req.file", req.file)
        console.log("da vao req.body", req.body)
        try {
            
            let {status, message, data} = await productModel.create({
                title: req.body.title,
                avatar: `imgs/products/${req.file.filename}`
            });

            return res.status(status ? 200 : 213).json({
                message,
                data
            })
        }catch(err) {
            return res.status(500).json({
                message: "Controller Err create"
            })
        }
    },
}