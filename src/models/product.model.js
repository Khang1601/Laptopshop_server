import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
    findMany: async function() {
        try {
            let products = await prisma.products.findMany({
                
            })

            return {
                status: true,
                message: "Find products ok!",
                data: products
            }
        }catch(err) {
            return {
                status: false,
                message: "Model err",
                data: null
            }
        }
    },

    //--------------
    create: async function(newProduct) {
        try {
            let product = await prisma.products.create({
                data: newProduct
            })

            return {
                status: true,
                message: "Create product ok!",
                data: product
            }
        }catch(err) {
            return {
                status: false,
                message: "Model err",
                data: null
            }
        }
    },

}