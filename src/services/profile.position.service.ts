import {prisma} from "./prisma";

export const createProfilePosition = async (
    profileId: number,
    positionId: number
) => {
    return prisma.positionOnProfiles.create({
        data: {profileId: profileId, positionId: positionId},
    });
};

export const readAllPositionByProfileId = async (
    profileId: number,
) => {
    return prisma.positionOnProfiles.findMany({where: {profileId}});
}

export const readAllProfileByPositionId = async (
    positionId: number,
) => {
    return prisma.positionOnProfiles.findMany({where: {positionId}});
}


export const deleteProfilePosition = async (
    profileId: number,
    positionId: number
) => {
    return prisma.positionOnProfiles.delete({
        where: {
            profileId_positionId: {
                profileId,
                positionId,
            },
        },
    });
};