import {prisma} from "./prisma";

export const createProfile = async (name: string, birth: Date, gender: string) => {
    return prisma.profile.create({
        data: {name, birth, gender},
    });
};

export const updateProfile = async (id: number, name: string, birth: Date, gender: string) => {
    return prisma.profile.update({
        where: {id},
        data: {name, birth, gender},
    });
};


export const deleteProfile = async (id: number) => {
    return prisma.profile.delete({
        where: {id}
    });
}

export const readAllProfile = async () => {
    return prisma.profile.findMany()
}

export const readProfileById = async (id: number) => {
    return prisma.profile.findUnique({
        where: {id}
    });
};