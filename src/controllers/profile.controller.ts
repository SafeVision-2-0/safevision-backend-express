import type {Request, Response} from "express";
import {
    createProfile,
    updateProfile,
    deleteProfile,
    readAllProfile,
    readProfileById
} from "../services/profile.service";
import {readAllTeamByProfileId} from "../services/profile.team.service";
import {readAllPositionByProfileId} from "../services/profile.position.service";
import {readProfileImagesByProfileId} from "../services/profile.image.service";
import {prisma} from "../services/prisma";
import path from "path";
import fs from "node:fs";

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

export const getTeamsByProfileId = async (req: Request, res: Response) => {
    try {
        const {profileId} = req.params;

        const profileTeams = await readAllTeamByProfileId(Number(profileId));

        res.status(200).json({
            success: true,
            message: "Semua data tim pada profil ini telah diambil",
            data: profileTeams
        });

    } catch (error) {
        res.status(500).json({message: "Error fetching positions", error});
    }
};

export const getPositionsById = async (req: Request, res: Response) => {
    try {
        const {profileId} = req.params;

        const profilePositions = await readAllPositionByProfileId(Number(profileId));

        res.status(200).json({
            success: true,
            message: "Semua data posisi pada profil ini telah diambil",
            data: profilePositions
        });

    } catch (error) {
        res.status(500).json({message: "Error fetching positions", error});
    }
};

export const getProfileImageByProfileId = async (req: Request, res: Response) => {
    try {
        const {profileId} = req.params;
        const profileImage = await readProfileImagesByProfileId(Number(profileId));

        res.status(200).json({
            success: true,
            message: "Data foto profil telah diambil",
            data: profileImage
        })
    }catch (error) {
        res.status(500).json({message: "Error fetching profile image", error});
    }
}

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
        const profileImages = await prisma.profileImage.findMany({
            where: { profileId: Number(id) },
            select: { image: true }
        });

        await deleteProfile(Number(id));

        for (const img of profileImages) {
            const absolutePath = path.join(process.cwd(), img.image);
            fs.unlink(absolutePath, () => {});
        }
        res.json({
            success: true,
            message: `Profil dengan id: ${id} telah berhasil dihapus`,
        })
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
}
