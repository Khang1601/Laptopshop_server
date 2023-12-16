import receiptModel from "../models/receipt.model";

export default {
    findManyBuyUserId: async function(req,res) {
        try {
            let {status, message, data} = await receiptModel.findManyBuyUserId(Number(req.params.userId));

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
    addToCart: async function(req,res) {
        try {
            let {status, message, data} = await receiptModel.addToCart(Number(req.params.userId), Number(req.params.productId));

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
    updateItemCart: async function(req,res) {
        try {
            let {status, message, data} = await receiptModel.updateCartItem(req.params.itemId, Number(req.params.newQuantity));

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

    deleteItemCart: async function(req,res) {
        try {
            let {status, message, data} = await receiptModel.deleteCartItem(req.params.receiptId, req.params.itemId);

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
    purchase: async function(req,res) {
        try {
            let {status, message, data} = await receiptModel.updateReceipt(req.params.receiptId, {
                status: "pending",
                total: Number(req.params.total)
            });

            return res.status(status ? 200 : 213).json({
                message,
                data
            })
        }catch(err) {
            return res.status(500).json({
                message: "Controller Err"
            })
        }
    }
}