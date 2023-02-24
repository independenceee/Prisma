# Start databases

1. sudo service postgresql start
2. sudo service postgresql stop

# setup

1. npm install --save-dev prisma typescript ts-node @types/node nodemon dotenv
2. npx prisma init --datasource-provider postgresql
3. npx prisma format
4. npm install @prisma/client

# env

1. postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA
    - USER: Tên người dùng cơ sở dữ liệu của bạn
    - PASSWORD: Mật khẩu cho người dùng cơ sở dữ liệu của bạn
    - HOST: Tên máy chủ lưu trữ của bạn (đối với môi trường cục bộ, nó là localhost)
    - PORT: Cổng nơi máy chủ cơ sở dữ liệu của bạn đang chạy (thường 5432dành cho PostgreSQL)
    - DATABASE: Tên cơ sở dữ liệu
    - SCHEMA: Tên của lược đồ bên trong cơ sở dữ liệu

# Prisma databases

1. npx prisma migrate dev --name init
2. npx prisma generate
3. npx prisma migrate dev
4. npx prisma studio

-   Cấu hình prisma đơn giản

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
// ?: tùy chọn


// các định nghĩa
// @id: khóa chính
// @default: mặc định
// autoincrement(): tự động tăng
// uuid(): Sử dụng uuid
// @relation(fields: [userId], references:[id]): mối quan hệ nhiều chiều
// enum

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

-   Quan hệ nhiều chiều

```prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id             String          @id @default(uuid())
  name           String
  age            Int
  email          String          @unique
  isAdmin        Boolean
  role           Role            @default(BASIC)
  preferences    Json?
  writtenPosts   Post[]          @relation("WrittenPosts")
  favoritePosts  Post[]          @relation("FavoritePosts")
  userPreference UserPreference?

  @@unique([age, name])
  @@index([email])
}

model UserPreference {
  id           String  @id @default(uuid())
  emailUpdates Boolean
  user         User    @relation(fields: [userId], references: [id])
  userId       String  @unique
}

model Post {
  id            String     @id @default(uuid())
  title         String
  averageRating Float
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
  author        User       @relation("WrittenPosts", fields: [authorId], references: [id])
  authorId      String
  favoriteBy    User?      @relation("FavoritePosts", fields: [favoriteById], references: [id])
  favoriteById  String?
  categories    Category[]
  // @@id([title, authorId])
}

model Category {
  id    String @id @default(uuid())
  name  String @unique
  posts Post[]
}

enum Role {
  BASIC
  ADMIN
  EDITOR
}

```

### Thao tác với prisma-clients

```ts
import { PrismaClient } from "@prisma/client";
const Prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: {},
    });
}
```
