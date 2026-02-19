import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding admin user...");

    /* =======================
       ADMIN PROFILE
    ======================= */
    const adminProfile =
        (await prisma.profile.findFirst({
            where: { name: "Administrator" },
        })) ??
        (await prisma.profile.create({
            data: {
                name: "Administrator",
                birth: new Date("1990-01-01"),
                gender: "M",
            },
        }));

    /* =======================
       ADMIN USER
    ======================= */
    await prisma.user.upsert({
        where: {
            email: "admin@safevision.local",
        },
        update: {
            profileId: adminProfile.id,
        },
        create: {
            email: "admin@safevision.local",
            username: "admin",
            password: "admin123", // ⚠️ DEV ONLY (hash nanti)
            profileId: adminProfile.id,
        },
    });

    console.log("✅ Admin user seeded successfully");
}

main()
    .catch((e) => {
        console.error("❌ Seed error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });