import {prisma} from "./prisma";

export const getAllTeams = async () => {
    return prisma.team.findMany();
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
