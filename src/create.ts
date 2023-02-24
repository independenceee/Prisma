import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });

async function main() {
    // create

    await prisma.user.deleteMany();
    const user = await prisma.user.create({
        data: {
            name: "Nguyễn Duy Khánh",
            email: "nguyenkhanh17112003@gamil.com",
            age: 18,
            isAdmin: true,
        },
    });

    console.log(user);

    await prisma.user.deleteMany();
    const user1 = await prisma.user.create({
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

    await prisma.user.deleteMany();
    const user2 = await prisma.user.create({
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
        select: {
            name: true,
            userPreference: {
                select: {
                    id: true,
                },
            },
        },
    });

    console.log(user);

    // createMany

    await prisma.user.deleteMany();
    const user3 = await prisma.user.createMany({
        data: [
            {
                name: "Nguyễn Duy Khánh",
                email: "nguyenkhanh17112003@gamil.com",
                age: 18,
                isAdmin: true,
            },
            {
                name: "Nguyễn Duy Khánh",
                email: "nguyenkhanhh17112003@gamil.com",
                age: 18,
                isAdmin: true,
            },
        ],
    });

    console.log(user3);
}

main()
    .catch((error) => {
        console.error(error.message);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
