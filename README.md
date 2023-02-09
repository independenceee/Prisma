# setup

1. npm install --save-dev prisma typescript ts-node @types/node nodemon dotenv
2. npx prisma init --datasource-provider postgresql
3. npx prisma format
4. npm install @prisma/client

# env

1. postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA
   USER: Tên người dùng cơ sở dữ liệu của bạn
   PASSWORD: Mật khẩu cho người dùng cơ sở dữ liệu của bạn
   HOST: Tên máy chủ lưu trữ của bạn (đối với môi trường cục bộ, nó là localhost)
   PORT: Cổng nơi máy chủ cơ sở dữ liệu của bạn đang chạy (thường 5432dành cho PostgreSQL)
   DATABASE: Tên cơ sở dữ liệu
   SCHEMA: Tên của lược đồ bên trong cơ sở dữ liệu

# Prisma

1. npx prisma migrate dev --name init
2. npx prisma generate

-   Cấu hình prisma đơn giản

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

```prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// các kiểu giá trị:
// Int
// String
// Boolean
// BigInt
// Float
// Decimal (5,2) giá trị từ -999.99 đến 999.99
// DateTime
// Json
// Bytes


model User {
    id Int @id @default(autoincrement())
    name String
    email String
    isAdmin Boolean
    preferences Json
    blod Unsupported("")

}


model Post {
    rating Float
    createdAt DateTime
    updatedAt DateTime
    author User @relation(feilds: [userId], references:[id])
    userId Int
}

```

-   Tạo 1 user

```ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            name: "Nguyễn Khánh",
            email: "nguyenkhanh17112003@gmail.com",
            isAdmin: true,
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
```

-   Tìm tất cả user

```ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.findMany();

    console.log(user);
}

main()
    .catch((error) => {
        console.error(error.message);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
```
