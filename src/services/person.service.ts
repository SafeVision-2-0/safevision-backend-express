import {prisma} from "./prisma";

export const readAllPerson = async () => {
    return prisma.profile.findMany({
        include: {
            positions: {
                include: {
                    position: true
                }
            },
            teams: {
                include: {
                    team: true
                }
            }
        }
    });
}

export const readPersonsWithPagination = async (
    skip: number,
    limit: number,
    teamId?: number,
    positionId?: number
) => {
    return prisma.profile.findMany({
        skip,
        take: limit,
        where: {
            AND: [
                teamId
                    ? {
                        teams: {
                            some: {
                                teamId: teamId,
                            },
                        },
                    }
                    : {},

                positionId
                    ? {
                        positions: {
                            some: {
                                positionId: positionId,
                            },
                        },
                    }
                    : {},
            ],
        },
        include: {
            profileImage: {
                take: 1,
                orderBy: {
                    created_at: "asc", // atau desc kalau mau yang terbaru
                },
                select: {
                    image: true,
                },
            },
            positions: {
                include: { position: true },
            },
            teams: {
                include: { team: true },
            },
        }
    });
};

export const totalPerson = async (
    teamId?: number,
    positionId?: number
) => {
    return prisma.profile.count({
        where: {
            AND: [
                teamId
                    ? { teams: { some: { teamId } } }
                    : {},
                positionId
                    ? { positions: { some: { positionId } } }
                    : {},
            ],
        },
    });
};

export const readPersonById = async (id: number) => {
    return prisma.profile.findUnique({
        where: {id},
        include: {
            positions: {
                include: {
                    position: true
                }
            },
            teams: {
                include: {
                    team: true
                }
            }
        }
    });
}