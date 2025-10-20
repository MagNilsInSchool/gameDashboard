import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const seed = async () => {
    const users = [
        {
            firstName: "Surely",
            lastName: "Beans",
            email: "surely@example.com",
            normalizedName: "surely bean",
        },
        {
            firstName: "Barely",
            lastName: "Beans",
            email: "barely@example.com",
            normalizedName: "barely bean",
        },
        {
            firstName: "Only",
            lastName: "Beans",
            email: "only@example.com",
            normalizedName: "only beans",
        },
    ];
    const games = [
        { title: "Grand theft bean", normalizedTitle: "grand thef tbean" },
        { title: "Beany Kong", normalizedTitle: "beany kong" },
        { title: "Super Bean brothers", normalizedTitle: "super bean brothers" },
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
