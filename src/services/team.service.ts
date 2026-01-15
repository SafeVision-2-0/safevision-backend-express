import {prisma} from "./prisma";

export const getAllTeams = async () => {
    return prisma.team.findMany();
}

export const readTeamsWithMembersPreview = async (
    skip: number,
    limit: number
) => {
    return prisma.team.findMany({
        skip: skip,
        take: limit,
        orderBy: {
            id: "asc",
        },
        include: {
            // jumlah anggota
            _count: {
                select: {
                    profiles: true,
                },
            },

            // ambil relasi profile (max 5)
            profiles: {
                take: 5,
                include: {
                    profile: {
                        select: {
                            id: true,
                            name: true,
                            profileImage: {
                                take: 1,
                                orderBy: {
                                    created_at: "asc", // atau desc
                                },
                                select: {
                                    image: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
};

export const readTeamsWithPagination = async (skip:number, limit:number) => {
    return prisma.team.findMany({
        skip,
        take: limit,
        orderBy: {
            id: "asc"
        }
    });
}

export const totalTeam = async () => {
    return prisma.team.count()
}

export const createTeam = async (name: string) => {
    return prisma.team.create({
        data: {name},
    });
};

export const updateTeam = async (id: number, name: string) => {
    return prisma.team.update({
        where: {id},
        data: {name},
    });
};

export const deleteTeam = async (id: number) => {
    return prisma.team.delete({
        where: {id}
    });
}
