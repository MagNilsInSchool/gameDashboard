import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const randomPastDate = (maxDaysBack = 10) => {
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
            image: "/assets/images/beans.png",
        },
        {
            firstName: "Farty",
            lastName: "McGass",
            email: "farty@dummy.com",
            normalizedName: "farty mcgass",
        },
    ];
    const games = [
        { title: "Cyberbean 2077", normalizedTitle: "cyberbean 2077" },
        { title: "Elden Bean", normalizedTitle: "elden bean" },
        { title: "Bean Raider", normalizedTitle: "bean raider" },
        { title: "Call of Beans", normalizedTitle: "call of beans" },
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
        createdAt: Date;
        endedAt?: Date | null;
    }[] = [];

    const minSessionsPerUser = 10;
    const maxSessionsPerUser = 20;
    const minSec = 15 * 60;
    const maxSec = 2 * 60 * 60;

    for (const user of allUsers) {
        const sessionCount =
            Math.floor(Math.random() * (maxSessionsPerUser - minSessionsPerUser + 1)) + minSessionsPerUser;

        for (let i = 0; i < sessionCount; i++) {
            const game = allGames[Math.floor(Math.random() * allGames.length)];

            const createdAt = randomPastDate(10);
            const durationSec = Math.floor(Math.random() * (maxSec - minSec + 1)) + minSec;
            const endedAt = new Date(createdAt.getTime() + durationSec * 1000);

            stats.push({
                userId: user.id,
                gameId: game.id,
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
