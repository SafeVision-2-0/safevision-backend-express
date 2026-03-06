import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {

    const email = "admin@example.com"

    const existing = await prisma.user.findUnique({
        where: { email }
    })

    if (existing) {
        console.log("Admin already exists")
        return
    }

    const hashedPassword = await bcrypt.hash("admin", 10)

    const profile = await prisma.profile.create({
        data: {
            name: "admin",
            birth: new Date("2000-01-01"),
            gender: "M"
        }
    })

    const user = await prisma.user.create({
        data: {
            email: email,
            password: hashedPassword,
            username: "admin",
            profileId: profile.id
        }
    })

    console.log("Admin user created:", user.email)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })