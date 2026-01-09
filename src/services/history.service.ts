import {prisma} from "./prisma";

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

