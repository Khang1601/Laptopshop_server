import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
    findMany: async function() {
        try {
            let categories = await prisma.categories.findMany({
                // where: {
                //     status: "active"
                // }
            })

            return {
                status: true,
                message: "Find categories ok!",
                data: categories
            }
        }catch(err) {
            return {
                status: false,
                message: "Model err",
                data: null
            }
        }
    },
    seedData: async function() {
        try {
            await prisma.categories.createMany({
                data: [
                  { title: 'Shirt', avatar: 'imgs/shirt.jpg', status: "active"},
                  { title: 'Short', avatar: 'imgs/short.png', status: "active"},
                  { title: 'Hat', avatar: 'imgs/hat.png', status: "active"},
                  { title: 'Shoes', avatar: 'imgs/shoes.png', status: "active"},
                ],
                skipDuplicates: true
            })

            return {
                status: true,
                message: "Seed data category ok!", 
                data: null
            }
        }catch(err){
            return {
                status: false,
                message: "Model err",
                data: null
            }
        }
    },
    create: async function(newCategory) {
        try {
            let category = await prisma.categories.create({
                data: newCategory
            })

            return {
                status: true,
                message: "Create category ok!",
                data: category
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