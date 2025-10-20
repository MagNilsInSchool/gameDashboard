import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const seed = async () => {
    const users = [
        {
            firstName: "Surely",
            lastName: "Beans",
            email: "surely@example.com",
            normalizedName: "surely beans",
        },
        {
            firstName: "Barely",
            lastName: "Beans",
            email: "barely@example.com",
            normalizedName: "barely beans",
        },
        {
            firstName: "Only",
            lastName: "Beans",
            email: "only@example.com",
            normalizedName: "only beans",
        },
    ];
    const games = [
        { title: "Grand theft bean", normalizedTitle: "grand theft bean" },
        { title: "Beany Kong", normalizedTitle: "beany kong" },
        { title: "Super Bean brothers", normalizedTitle: "super bean brothers" },
    ];

    await prisma.user.createMany({
        data: users,
        skipDuplicates: true,
    });
    await prisma.game.createMany({
        data: games,
        skipDuplicates: true,
    });

    const [allUsers, allGames] = await Promise.all([
        prisma.user.findMany({ select: { id: true } }),
        prisma.game.findMany({ select: { id: true } }),
    ]);
    const stats: { timePlayed: number; userId: number; gameId: number }[] = [];
    for (const user of allUsers) {
        const playedGames = allGames.slice(0, 2);
        for (const g of playedGames) {
            stats.push({
                timePlayed: Math.floor(Math.random() * (60 * 60)) + 30,
                userId: user.id,
                gameId: g.id,
            });
        }
    }
    if (stats.length) {
        const result = await prisma.gameStat.createMany({ data: stats });
        console.log("Inserted gameStat count:", result.count);
    } else {
        console.log("No stats to insert");
    }
};
seed()
    .catch((e) => {
        console.error(e);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
