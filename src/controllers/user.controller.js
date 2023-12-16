import userModel from "../models/user.model.js";

export default {
    findMany: async function(req,res) {
        try {
            let {status, message, data} = await userModel.findMany();

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
    //-------------
    create: async function(req,res) {
        console.log("da vao")
        console.log("da vao req.file", req.file)
        console.log("da vao req.body", req.body)
        try {
            
            let {status, message, data} = await userModel.create({
                title: req.body.title,
                avatar: `imgs/users/${req.file.filename}`
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
    delete: async function(req,res) {

        try {
            
            let {status, message, data} = await userModel.delete(req.params.userId);

            return res.status(status ? 200 : 213).json({
                message,
                data
            })
        }catch(err) {
            return res.status(500).json({
                message: "Controller Err delete"
            })
        }
    },
}