import {prisma} from "./prisma";

export const getAllPositions = async () => {
    return prisma.position.findMany();
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
