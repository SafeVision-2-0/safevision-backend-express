import {prisma} from "./prisma";

export const createProfileTeam = async (
    profileId: number,
    teamId: number
) => {
    return prisma.teamOnProfiles.create({
        data: {profileId: profileId, teamId: teamId},
    });
};

export const readAllTeamByProfileId = async (
    profileId: number,
) => {
    return prisma.teamOnProfiles.findMany({where: {profileId}});
}

export const readAllProfileByTeamId = async (
    teamId: number,
) => {
    return prisma.teamOnProfiles.findMany({where: {teamId}});
}

export const deleteProfileTeam = async (
    profileId: number,
    teamId: number
) => {
    return prisma.teamOnProfiles.delete({
        where: {
            profileId_teamId: {
                profileId,
                teamId,
            },
        }
    });
}
