import {prisma} from "./prisma";

export const readAllProfileImages = async () => {
    return prisma.profileImage.findMany();
}

export const readProfileImageById = async (id: number) => {
    return prisma.profileImage.findUnique({
        where: {id}
    });
};

export const createProfileImage = async (profileId: number, image: string,) => {
    return prisma.profileImage.create({
        data: {profileId, image},
    });
};

export const deleteProfileImage = async (id: number) => {
    return prisma.profileImage.delete({
        where: {id}
    });
}

export const readProfileImagesByProfileId = async (profileId: number) => {
    return prisma.profileImage.findMany({
        where: {profileId}
    });
}
