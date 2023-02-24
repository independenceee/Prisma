import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });

async function main() {
    try {
        // findUnique

        const users = await prisma.user.findUnique({
            where: {
                email: "nguyenkhanh17112003@gmail.com",
            },
        });

        console.log(users);

        // findUniqueMany

        const users1 = await prisma.user.findUnique({
            where: {
                age_name: {
                    age: 18,
                    name: "Nguyễn Khánh",
                },
            },
        });

        console.log(users1);

        // findFirst

        const users2 = await prisma.user.findFirst({
            where: {
                name: "Nguyễn Khánh",
            },
        });

        console.log(users2);

        // findMany

        const users3 = await prisma.user.findMany({
            where: {
                name: "Nguyễn Khánh",
            },
        });

        console.log(users3);

        const users4 = await prisma.user.findMany({
            where: {
                name: "Nguyễn Khánh",
            },
            distinct: ["name", "age"], // tìm những khác biệt về tên và tuổi
        });

        console.log(users4);

        const users5 = await prisma.user.findMany({
            where: {
                name: "Nguyễn Khánh",
            },
            orderBy: {
                age: "desc", // đơn đặt hàng theo thứ tự abc - tăng dần
            },
            take: 2, // xác định số lượng muốn trả lại
            skip: 1, // bỏ qua người dùng đầu tiên
        });

        console.log(users5);

        const users6 = await prisma.user.findMany({
            where: {
                name: {
                    equals: "Nguyễn Khánh", // tìm tất cả người dùng có tên Nguyễn Khánh
                    not: "Nguyễn Khánh", // tìm tất cả người dùng không có tên Khánh Nguyễn
                    in: ["Nguyễn Khánh", "Khánh Nguyễn"], // tìm tất cả người dùng có tên Khánh Nguyễn hoặc Nguyễn Khánh
                    notIn: ["Nguyễn Khánh", "Khánh Nguyễn"], // tìm tất cả người dùng không có tên Khánh Nguyễn hoặc Nguyễn Khánh
                },
                age: {
                    lt: 20, // nhận tất cả người dùng dưới 20 tuổi
                },
                email: {
                    startsWith: "@gamil.com", // tìm tất cả các người dùng có địa chỉ @gmail.com
                    contains: "@gamil.com", // tìm tất cả các người dùng có địa chỉ @gmail.com
                    endsWith: "@gamil.com", // tìm tất cả các người dùng có địa chỉ @gmail.com
                },

                AND: [
                    {
                        email: { startsWith: "nguyenkhanh" },
                    },
                    { name: { equals: "Nguyễn Khánh" } },
                    { age: { gt: 20 } }, // tuổi lớn hơn 20
                ],

                NOT: [
                    {
                        email: { startsWith: "nguyenkhanh" },
                    },
                    { name: { equals: "Nguyễn Khánh" } },
                    { age: { gt: 20 } }, // tuổi lớn hơn 20
                ],
            },
        });

        console.log(users6.length);

        const users7 = await prisma.user.findMany({
            where: {
                userPreference: {
                    emailUpdates: true,
                },
            },
        });

        console.log(users7);

        const users8 = await prisma.user.findMany({
            where: {
                writtenPosts: {
                    every: {
                        createdAt: new Date(),
                        title: "Test",
                    },
                    none: {
                        createdAt: new Date(),
                        title: "Test",
                    },
                    some: {
                        createdAt: new Date(),
                        title: { startsWith: "test" },
                    },
                },
            },
        });

        console.log(users8);

        const users9 = await prisma.post.findMany({
            where: {
                author: {
                    is: {
                        age: 27,
                    },
                    isNot: {
                        
                    }
                },
            },
        });
    } catch (error) {
        console.log(error);
    } finally {
        prisma.$disconnect();
    }
}

main();
