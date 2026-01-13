import {prisma} from "./prisma";


interface HistoryQuery {
    skip: number;
    take: number;
    status?: "known" | "unknown" | undefined;
    profileId?: number | undefined;
    date?: string | undefined;
}

export const readHistoriesWithPagination = async ({skip, take, status, profileId, date,}: HistoryQuery) => {
    const where: any = {};

    /**
     * DATE FILTER
     */
    if (date) {
        const start = new Date(`${date}T00:00:00.000Z`);
        const end = new Date(`${date}T23:59:59.999Z`);

        where.created_at = {
            gte: start,
            lte: end,
        };
    }

    /**
     * PROFILE + STATUS LOGIC
     */
    if (profileId && status === "unknown") {
        // profileId OR unknown
        where.OR = [
            {profileId},
            {profileId: null},
        ];
    } else if (profileId) {
        // profileId only (ignore status)
        where.profileId = profileId;
    } else if (status === "unknown") {
        where.profileId = null;
    } else if (status === "known") {
        where.profileId = {not: null};
    }

    return prisma.history.findMany({
        where,
        skip,
        take,
        orderBy: {
            created_at: "desc",
        },
        include: {
            profile: true, // optional
        },
    });
};

export const countTodayHistoriesPerProfile = async (date: string) => {
    const start = new Date(`${date}T00:00:00.000Z`);
    const end = new Date(`${date}T23:59:59.999Z`);

    return prisma.history.groupBy({
        by: ["profileId"],
        where: {
            profileId: { not: null },
            created_at: {
                gte: start,
                lte: end,
            },
        },
        _count: {
            id: true,
        },
        orderBy: {
            _count: {
                id: "desc",
            },
        },
    });
};

export const getTodayHistoryStats = async (date: string) => {
    const grouped = await countTodayHistoriesPerProfile(date);

    const profileIds = grouped.map(g => g.profileId!) ;

    const profiles = await prisma.profile.findMany({
        where: { id: { in: profileIds } },
        select: { id: true, name: true },
    });

    const profileMap = new Map(
        profiles.map(p => [p.id, p.name])
    );

    return grouped.map(g => ({
        profileId: g.profileId,
        profileName: profileMap.get(g.profileId!) ?? "Unknown",
        count: g._count.id,
    }));
};

export const countHistories = async ({status, profileId, date,}: Omit<HistoryQuery, "skip" | "take">) => {
    const where: any = {};

    if (date) {
        const start = new Date(`${date}T00:00:00.000Z`);
        const end = new Date(`${date}T23:59:59.999Z`);

        where.created_at = {gte: start, lte: end};
    }

    if (profileId && status === "unknown") {
        where.OR = [
            {profileId},
            {profileId: null},
        ];
    } else if (profileId) {
        where.profileId = profileId;
    } else if (status === "unknown") {
        where.profileId = null;
    } else if (status === "known") {
        where.profileId = {not: null};
    }

    return prisma.history.count({where});
};

export const readAllHistories = async () => {
    return prisma.history.findMany();
}

export const readHistoryById = async (id: number) => {
    return prisma.history.findUnique({
        where: {id}
    });
};

export const createHistory = async (profileId: number | null, imageCaptured: string, isUnknown: boolean) => {
    return prisma.history.create({
        data: {imageCaptured, isUnknown, profileId},
    });
};

export const deleteHistory = async (id: number) => {
    return prisma.history.delete({
        where: {id}
    });
}

