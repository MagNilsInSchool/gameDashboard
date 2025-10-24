import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const randomPastDate = (maxDaysBack = 30) => {
    const now = Date.now();
    const past = now - Math.floor(Math.random() * maxDaysBack * 24 * 60 * 60 * 1000);
    return new Date(past);
};

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
        {
            firstName: "Farty",
            lastName: "McGass",
            email: "farty@dummy.com",
            normalizedName: "farty mcgass",
        },
    ];
    const games = [
        { title: "Grand theft bean", normalizedTitle: "grand theft bean" },
        { title: "Beany Kong", normalizedTitle: "beany kong" },
        { title: "Super Bean brothers", normalizedTitle: "super bean brothers" },
        { title: "Call of beans", normalizedTitle: "call of beans" },
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

    const stats: {
        userId: number;
        gameId: number;
        timePlayed?: number | null;
        isEnded?: boolean;
        createdAt?: Date;
        endedAt?: Date | null;
    }[] = [];

    for (const user of allUsers) {
        const playedGames = allGames.slice(0, Math.floor(Math.random() * allGames.length) + 1);
        for (const g of playedGames) {
            const createdAt = randomPastDate(30);

            const minSec = 5 * 60;
            const maxSec = 3 * 60 * 60;
            const durationSec = Math.floor(Math.random() * (maxSec - minSec + 1)) + minSec;
            const endedAt = new Date(createdAt.getTime() + durationSec * 1000);

            stats.push({
                userId: user.id,
                gameId: g.id,
                timePlayed: durationSec,
                isEnded: true,
                createdAt,
                endedAt,
            });
        }
    }

    if (stats.length) {
        const result = await prisma.gameStat.createMany({
            data: stats,
            skipDuplicates: true,
        });
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
