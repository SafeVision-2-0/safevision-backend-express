import type {Request, Response} from "express";
import {getAllUsers, updateUser} from "../services/user.service";

export const getUsers = async (req: Request, res: Response) => {
    try{
        const users = await getAllUsers();

        res.status(200).json({
            success: true,
            message: "Data pengguna telah diambil",
            data: users
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

export const putUser = async (req:Request, res: Response) => {
    try {
        const  id  = req.userId;
        const { username } = req.body;

        const updatedUser = await updateUser(Number(id), username);

        res.status(201).json({
            success: true,
            message: `Data pengguna dengan id: ${id} telah diperbaharui`,
            data: updatedUser
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};
