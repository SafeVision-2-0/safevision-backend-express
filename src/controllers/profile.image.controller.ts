import type {Request, Response} from "express";
import path from "path";
import fs from "node:fs";
import {readProfileById} from "../services/profile.service";
import {
    createProfileImage,
    deleteProfileImage,
    readAllProfileImages,
    readProfileImageById
} from "../services/profile.image.service";

export const getProfileImages = async (req: Request, res: Response) => {
    try {
        const profileImages = await readAllProfileImages();

        res.status(200).json({
            success: true,
            message: "Data gambar profil telah diambil",
            data: profileImages
        });
    } catch (error) {
        res.status(500).json({message: "Error fetching profile images", error});
    }
};

export const getProfileImageById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const profileImage = await readProfileImageById(Number(id));

        res.status(200).json({
            success: true,
            message: "Data gambar profil telah diambil",
            data: profileImage
        });
    } catch (error) {
        res.status(500).json({message: "Error fetching profil image", error});
    }
};

export const eraseProfileImage = async (req: Request, res: Response) => {
    const {id} = req.params;

    try {
        const profileImage = await readProfileImageById(Number(id));

        if (!profileImage) {
            return res.status(404).json({message: "Gambar profil yang ingin dihapus tidak ada"});
        }

        await deleteProfileImage(Number(id));

        const absolutePath = path.join(
            process.cwd(),
            profileImage.image
        );

        fs.unlink(absolutePath, () => {});
        res.json({
            success: true,
            message: `Profile Image dengan id: ${id} telah berhasil dihapus`,
        })
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
}

export const postProfileImage = async (
    req: Request,
    res: Response
) => {
    const {profileId} = req.body
    console.log(`profile id: ${profileId}`);

    if (!req.file) {
        return res.status(400).json({message: "File harus berupa gambar"});
    }
    const absolutePath = path.join(
        process.cwd(),
        req.file.path
    );

    try {
        if (profileId) {
            const profile = await readProfileById(Number(profileId));
            console.log("profile", profile);
            if (!profile) {
                fs.unlink(absolutePath, () => {
                });
                return res.status(400).json({
                    error: "Profil tidak ditemukan"
                });
            }
        }

        const imagePath = `/uploads/profile-image/${req.file.filename}`;

        const newProfileImage = await createProfileImage(
            Number(profileId),
            imagePath,
        );

        res.json({
            success: true,
            message: "Data gambar profil terbaru telah ditambahkan",
            path: newProfileImage,
        });

    } catch (error) {
        fs.unlink(absolutePath, (err) => {
            if (err) console.error(err);
        });
        res.status(500).json({message: "Error creating profile image", error});
    }
};