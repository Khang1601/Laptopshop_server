import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
    findManyBuyUserId: async function (userId) {
        try {
            let receipts = await prisma.receipts.findMany({
                where: {
                    userId
                },
                include: {
                    receipt_details: {
                        include: {
                            product: true
                        }
                    },
                    user: true
                }
            })

            return {
                status: true,
                message: "Find receipts ok!",
                data: receipts
            }
        } catch (err) {
            return {
                status: false,
                message: "Model err",
                data: null
            }
        }
    },
    addToCart: async function (userId, productId) {
        try {
            let cartExist = await prisma.receipts.findMany({
                where: {
                    userId,
                    status: "shopping"
                }
            })

            if (!cartExist[0]) {
                // chua co cart
                let newCart = await prisma.receipts.create({
                    data: {
                        userId,
                        createdAt: String(Date.now()),
                        receipt_details: {
                            create: [
                                {
                                    productId,
                                    quantity: 1
                                }
                            ]
                        }
                    },
                    include: {
                        receipt_details: {
                            include: {
                                product: true
                            }
                        }
                    }
                })

                return {
                    status: true,
                    message: "ok",
                    data: newCart
                }
            } else {

                // da co cart
                let productExist = await prisma.receipt_details.findMany({
                    where: {
                        receiptId: cartExist[0].id,
                        productId
                    }
                })


                if (!productExist[0]) {
                    // sp chua tung mua
                    let newItem = await prisma.receipt_details.create({
                        data: {
                            productId,
                            receiptId: cartExist[0].id,
                            quantity: 1
                        }
                    })

                    let nowCart = await prisma.receipts.findUnique({
                        where: {
                            id: cartExist[0].id
                        },
                        include: {
                            receipt_details: {
                                include: {
                                    product: true
                                }
                            }
                        }
                    })
                    if (!nowCart) {
                        return {
                            status: false,
                            message: "failed",
                            data: null
                        }
                    }

                    return {
                        status: true,
                        message: "ok",
                        data: nowCart
                    }
                } else {
                    // sp da ton tai trong gio hang
                    let itemUpdate = await prisma.receipt_details.update({
                        where: {
                            id: productExist[0].id
                        },
                        data: {
                            quantity: productExist[0].quantity + 1
                        }
                    })

                    let nowCart = await prisma.receipts.findUnique({
                        where: {
                            id: cartExist[0].id
                        },
                        include: {
                            receipt_details: {
                                include: {
                                    product: true
                                }
                            }
                        }
                    })
                    if (!nowCart) {
                        return {
                            status: false,
                            message: "failed",
                            data: null
                        }
                    }

                    return {
                        status: true,
                        message: "ok",
                        data: nowCart
                    }
                }
            }
        } catch (err) {
            //console.log("err", err)
            return {
                status: false,
                message: "failed",
                data: null
            }
        }
    },
    updateCartItem: async function (itemId, newQuantity) {
        try {
            let item = await prisma.receipt_details.update({
                where: {
                    id: itemId
                },
                data: {
                    quantity: Number(newQuantity)
                }
            })



            let nowCart = await prisma.receipts.findUnique({
                where: {
                    id: item.receiptId
                },
                include: {
                    receipt_details: {
                        include: {
                            product: true
                        }
                    },
                    user: true
                }
            })
            if (!nowCart) {
                return {
                    status: false,
                    message: "failed",
                    data: null
                }
            }

            return {
                status: true,
                message: "ok",
                data: nowCart
            }
        } catch (err) {
            return {
                status: false,
                message: "Model err",
                data: null
            }
        }
    },
    deleteCartItem: async function (receiptId, itemId) {
        try {
            await prisma.receipt_details.delete({
                where: {
                    id: itemId
                }
            })

            let nowCart = await prisma.receipts.findUnique({
                where: {
                    id: receiptId
                },
                include: {
                    receipt_details: {
                        include: {
                            product: true
                        }
                    },
                    user: true
                }
            })
            if (!nowCart) {
                return {
                    status: false,
                    message: "failed",
                    data: null
                }
            }

            return {
                status: true,
                message: "ok",
                data: nowCart
            }
        } catch (err) {
            return {
                status: false,
                message: "Model err",
                data: null
            }
        }
    },
    updateReceipt: async function (receiptId, dataUpdate) {
        try {
            let receipt = await prisma.receipts.update({
                where: {
                    id: receiptId
                },
                data: dataUpdate,
                include: {
                    receipt_details: {
                        include: {
                            product: true
                        }
                    },
                    user: true
                }
            })
            return {
                status: true,
                message: "ok",
                data: receipt
            }
        }catch(err) {
            console.log("err", err)
            return {
                status: false,
                message: "failed",
                data: null
            }
        }
    } 
}