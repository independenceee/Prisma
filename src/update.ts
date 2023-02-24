import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });

const main = async function () {
    try {
        const user = await prisma.user.update({
            where: {
                email: "nguyenkhanh17112003@gmail.com",
            },
            data: {
                email: "nguyenkhanh17112003@gmsil.com",
            },
        });

        const user1 = await prisma.user.updateMany({
            where: {
                email: "nguyenkhanh17112003@gmail.com",
            },
            data: {
                email: "nguyenkhanh17112003@gmsil.com",
            },
        });

        const user2 = await prisma.user.updateMany({
            where: {
                email: "nguyenkhanh17112003@gmail.com",
            },
            data: {
                email: "nguyenkhanh17112003@gmsil.com",
                age: {
                    decrement: 1, // age tăng lên 1
                    divide: 10, // chia
                    multiply: 10, // nhân 10
                },
            },
        });

        // update realtion

        const user3 = await prisma.user.update({
            where: {
                email: "nguyenkhanh17112003@gmail.com",
            },
            data: {
                userPreference: {
                    create: {
                        emailUpdates: true,
                    },
                },
            },
        });

        // const preference = await prisma.userPreference.create({
        //     data: {
        //         emailUpdates: true,
        //     },
        // });

        const user4 = await prisma.user.update({
            where: {
                email: "nguyenkhanh17112003@gmail.com",
            },
            data: {
                userPreference: {
                    // disconnect: true
                    connect: {
                        id: "7d59f988-075e-4709-ac73-918bfd38d153",
                    },
                },
            },
        });

        const user5 = await prisma.user.findFirst({
            where: {
                name: "Nguyễn Khánh",
            },
            include: {
                userPreference: true,
            },
        });

        console.log(user);
    } catch (error) {
        console.log(error);
    } finally {
        await prisma.$disconnect();
    }
};
