import {prisma} from "./prisma";

export const readAllPerson = async () => {
    return prisma.profile.findMany({
        include: {
            positions: {
                include: {
                    position: true
                }
            },
            teams: {
                include: {
                    team: true
                }
            }
        }
    });
}

export const readPersonById = async (id:number) => {
    return prisma.profile.findUnique({
        where: {id},
        include: {
            positions: {
                include: {
                    position: true
                }
            },
            teams: {
                include: {
                    team: true
                }
            }
        }
    });
}