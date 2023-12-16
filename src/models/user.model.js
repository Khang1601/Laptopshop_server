import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
    findMany: async function() {
        try {
            let users = await prisma.users.findMany({
                // where: {
                //     status: "active"
                // }
            })

            return {
                status: true,
                message: "Find users ok!",
                data: users
            }
        }catch(err) {
            return {
                status: false,
                message: "Model err",
                data: null
            }
        }
    },
    //------------
    create: async function(newUser) {
        try {
            let user = await prisma.users.create({
                data: newUser
            })

            return {
                status: true,
                message: "Create user ok!",
                data: user
            }
        }catch(err) {
            return {
                status: false,
                message: "Model err",
                data: null
            }
        }
    },
    delete: async function(userId) {
        try {
            let deletedUser = await prisma.users.delete({
                where: {
                    id: userId
                }
            });

            return {
                status: true,
                message: "delete user ok!",
                data: user
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