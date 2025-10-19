import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const seed = async () => {
    const users = [
        {
            firstName: "Surely",
            lastName: "Bean",
            email: "surely@example.com",
            normalizedName: "surelybean",
        },
        {
            firstName: "Barely",
            lastName: "Bean",
            email: "barely@example.com",
            normalizedName: "barelybean",
        },
        {
            firstName: "Only",
            lastName: "Beans",
            email: "only@example.com",
            normalizedName: "onlybeans",
        },
    ];
    const games = [
        { title: "Grand theft bean", normalizedTitle: "grandtheftbean" },
        { title: "Beany Kong", normalizedTitle: "beanykong" },
        { title: "Super Bean brothers", normalizedTitle: "superbeanbrothers" },
    ];

    await prisma.user.createMany({
        data: users,
    });
    await prisma.game.createMany({
        data: games,
    });
};
seed()
    .catch((e) => {
        console.error(e);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
