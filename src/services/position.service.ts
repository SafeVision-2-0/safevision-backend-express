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
