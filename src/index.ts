import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany();
    const user = await prisma.user.create({
        data: {
            name: "Nguyễn Duy Khánh",
            email: "nguyenkhanhh17112003@gamil.com",
            age: 18,
            isAdmin: true,
            userPreference: {
                create: {
                    emailUpdates: true,
                },
            },
        },
        include: {
            userPreference: true,
        },
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
