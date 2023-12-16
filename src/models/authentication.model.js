import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
    register: async function(newUser) {
        try {
            let user = await prisma.users.create({
                data: newUser
            })
            return {
                status: true,
                message: "ok",
                data: user
            }
        }catch(err) {
            return {
                status: false,
                message: "Fail",
                data: null
            }
        }
    },
    update: async function(email, updateData) {
        try {
            let user = await prisma.users.update({
                where: {
                    email
                },
                data: updateData
            })

            return {
                status: true,
                message: "Ok",
                data: user
            }
        }catch(err) {
            return {
                status: false,
                message: "Fail",
                data: null
            }
        }
    },
    findUserByEmail: async function(email) {
        try {
            let user = await prisma.users.findUnique({
                where: {
                    email
                }
            })

            return {
                status: true,
                message: "ok",
                data: user
            }
        }catch(err) {
            console.log("err", err)
            return {
                status: false,
                message: "Fail",
                data: null
            }
        }
    }
}