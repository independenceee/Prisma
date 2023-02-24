import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const main = async function () {
    try {
        const user = await prisma.user.delete({
            where: {
                email: "nguyenkhanh17112033@gmail.com",
            },
        });

        const user1 = await prisma.user.deleteMany({
            where: {
                age: {
                    gt: 18, // lớn hơn 18
                },
            },
        });
        console.log(user);
    } catch (error) {
        console.log(error);
    } finally {
        await prisma.$disconnect;
    }
};

main();
