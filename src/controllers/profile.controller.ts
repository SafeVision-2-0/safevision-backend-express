import type {Request, Response} from "express";
import {
    createProfile,
    updateProfile,
    deleteProfile,
    readAllProfile,
    readProfileById
} from "../services/profile.service";
import {getAllUsers} from "../services/user.service";
import {getAllTeams} from "../services/team.service";


export const getProfiles = async (req: Request, res: Response) => {
    try {
        const profiles = await readAllProfile();

        res.status(200).json({
            success: true,
            message: "Data profil telah diambil",
            data: profiles
        });
    } catch (error) {
        res.status(500).json({message: "Error fetching profiles", error});
    }
};

export const getProfileById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const profile = await readProfileById(Number(id));

        res.status(200).json({
            success: true,
            message: "Data profil telah diambil",
            data: profile
        });
    } catch (error) {
        res.status(500).json({message: "Error fetching profile", error});
    }
};


export const postProfile = async (req: Request, res: Response) => {
    try {
        const {name, birth, gender} = req.body;
        const newProfile = await createProfile(
            name,
            new Date(birth), // ← konversi di boundary HTTP
            gender
        );
        res.status(201).json({
            success: true,
            message: "Data profil terbaru telah ditambahkan",
            data: newProfile
        });
    } catch (error) {
        res.status(500).json({message: "Error creating profile", error});
    }
};

export const putProfile = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {name, birth, gender} = req.body;

        const updatedProfile = await updateProfile(
            Number(id), name, new Date(birth), gender
        );

        res.status(201).json({
            success: true,
            message: `Data profil dengan id: ${id} telah diperbaharui`,
            data: updatedProfile
        });
    } catch (error) {
        res.status(500).json({message: "Error updating profile", error});
    }
};

export const eraseProfile = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        await deleteProfile(Number(id));
        res.json({
            success: true,
            message: `Profil dengan id: ${id} telah berhasil dihapus`,
        })
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
}
