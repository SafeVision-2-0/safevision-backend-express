import {prisma} from "./prisma";

export const readAllPositions = async () => {
    return prisma.position.findMany();
}

export const readPositionsWithPagination = async (skip:number, limit:number) => {
    return prisma.position.findMany({
        skip,
        take: limit,
        orderBy: {
            id: "asc"
        }
    });
}

export const readPositionsWithMembersPreview = async (
    skip: number,
    limit: number
) => {
    return prisma.position.findMany({
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

export const totalPosition = async () => {
    return prisma.position.count()
}

export const createPosition = async (name: string) => {
    return prisma.position.create({
        data: {name},
    });
};

export const updatePosition = async (id: number, name: string) => {
    return prisma.position.update({
        where: {id},
        data: {name},
    });
};

export const deletePosition = async (id: number) => {
    return prisma.position.delete({
        where: {id}
    });
}
