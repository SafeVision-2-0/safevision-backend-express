import {prisma} from "./prisma";


export const getAllUsers = () => prisma.user.findMany();

export const getByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: {email}
    });
};

export const createUser = async (email: string, password: string, username: string) => {
    return prisma.user.create({
        data: {email, password, username},
    });
};

export const updateUser = async (id: number,username:string) => {
    return prisma.user.update({
        where: {id:id},
        data: {username: username},
    })
}