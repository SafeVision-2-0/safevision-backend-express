import type {Request, Response} from "express";
import {createHistory, deleteHistory, readAllHistories, readHistoryById} from "../services/history.service";
import {readProfileById} from "../services/profile.service";
import * as fs from "node:fs";
import path from "path";

export const getHistories = async (req: Request, res: Response) => {
    try {
        const histories = await readAllHistories();

        res.status(200).json({
            success: true,
            message: "Data histori telah diambil",
            data: histories
        });
    } catch (error) {
        res.status(500).json({message: "Error fetching histories", error});
    }
};

export const getHistoryById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const history = await readHistoryById(Number(id));

        res.status(200).json({
            success: true,
            message: "Data histori telah diambil",
            data: history
        });
    } catch (error) {
        res.status(500).json({message: "Error fetching history", error});
    }
};

export const eraseHistory = async (req: Request, res: Response) => {
    const {id} = req.params;

    try {
        const history = await readHistoryById(Number(id))

        if (!history) {
            return res.status(404).json({message: "Histori yang ingin dihapus tidak ada"});
        }

        await deleteHistory(Number(id));
        const absolutePath = path.join(
            process.cwd(),
            history.imageCaptured
        );

        fs.unlink(absolutePath, () => {});
        res.json({
            success: true,
            message: `History dengan id: ${id} telah berhasil dihapus`,
        })
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
}

export const postHistory = async (
    req: Request,
    res: Response
) => {
    const {profileId, isUnknown} = req.body
    console.log(profileId);
    if (!req.file) {
        return res.status(400).json({message: "File harus berupa gambar"});
    }

    const absolutePath = path.join(
        process.cwd(),
        req.file.path
    );
    if (isUnknown === "true" && profileId) {
        fs.unlink(absolutePath, () => {
        });
        return res.status(400).json({
            error: "History unknown tidak boleh memiliki profileId",
        });
    }

    if (isUnknown === "false" && !profileId) {
        fs.unlink(absolutePath, () => {
        });
        return res.status(400).json({
            error: "History dikenal harus memiliki profileId",
        });
    }

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

        const imagePath = `/uploads/history/${req.file.filename}`;

        const newHistory = await createHistory(
            profileId ? Number(profileId) : null,
            imagePath,
            isUnknown.toLowerCase() === 'true'
        );

        res.json({
            success: true,
            message: "Data posisi terbaru telah ditambahkan",
            path: newHistory,
        });

    } catch (error) {
        fs.unlink(absolutePath, (err) => {
            if (err) console.error(err);
        });
        res.status(500).json({message: "Error creating history", error});
    }
};