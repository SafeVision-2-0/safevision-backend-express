import {prisma} from "./prisma";


export const readAllUsers = () => prisma.user.findMany();

export const readUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: {email}
    });
};

export const createUser = async (profileId: number, email: string, password: string, username: string) => {
    return prisma.user.create({
        data: {email, password, username,profileId},
    });
};

export const updateUser = async (id: number, username: string) => {
    return prisma.user.update({
        where: {id: id},
        data: {username: username},
    })
}