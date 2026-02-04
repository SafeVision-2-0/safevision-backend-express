import type {Request, Response} from "express";
import {createUser, readUserByEmail, readUserById} from "../services/user.service";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {readProfileById} from "../services/profile.service";

interface AuthenticatedRequest extends Request {
    user?: {
        userId: number; // Structure depends on your JWT payload
    };
}

export const register = async (req: Request, res: Response) => {
    try {
        //get variable from body
        const {profileId, email, password, username} = req.body;

        //check if profile already registered (error if no)
        const existingProfile = await readProfileById(profileId);
        if (!existingProfile) {
            return res.status(409).json({error: 'Profil dengan id ini tidak terdaftar'});
        }

        //check if user already registered (error if yes)
        const existingUser = await readUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({error: 'Akun dengan email ini telah terdaftar.'});
        }

        //hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser(profileId, email, hashedPassword, username);

        //send success response
        res.status(201).json({
            success: true,
            message: "Pengguna terbaru telah ditambahkan",
            data: newUser
        });
    } catch (error) {
        res.status(500).json({message: "Error creating user", error});
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        //get variable from body
        const {email, password} = req.body;
        const existingUser = await readUserByEmail(email);

        //check if user exist (error if no)
        if (!existingUser) {
            return res.status(401).json({error: 'Email salah.'})
        }

        //compare password to db (error if not same)
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({error: `${password} Password salah. ${existingUser.password}`});
        }

        //make token
        const token = jwt.sign(
            {userId: existingUser.id},
            process.env.SECRET_KEY as string,
            {expiresIn: '15m'}
        );

        //send success response
        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({message: "Internal server error.", error});
    }
}

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await readUserById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};