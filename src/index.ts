import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany();
    const user = await prisma.user.createMany({
        data: [
            {
                name: "Nguyễn Khánh",
                email: "nguyenkhanh17112003@gmail.com",
                age: 18,
                isAdmin: true,
            },
            {
                name: "Nguyễn Khánh",
                email: "nguyennkhanhh17112003@gmail.com",
                age: 18,
                isAdmin: false,
            },
        ],
    });

    console.log(user);
}

main()
    .catch((error) => {
        console.error(error.message);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
