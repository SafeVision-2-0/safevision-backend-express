import type {Request, Response} from "express";
import {
    createProfilePosition,
    deleteProfilePosition,
    readAllPositionByProfileId
} from "../services/profile.position.service";
import {readAllProfile} from "../services/profile.service";

export const postProfilePosition = async (
    req: Request,
    res: Response
) => {
    try {
        const {profileId, positionId} = req.body;
        const newProfile = await createProfilePosition(
            Number(profileId),
            Number(positionId),
        );
        res.status(201).json({
            success: true,
            message: `Posisi dengan id: ${positionId} telah berhasil ditambahkan ke Profil dengan id:${profileId}`,
            data: newProfile
        });
    } catch (error) {
        res.status(500).json({message: "Error adding position to profile", error});
    }
};



export const eraseProfilePosition = async (
    req: Request,
    res: Response
) => {
    const {profileId, positionId} = req.params;

    try {
        await deleteProfilePosition(Number(profileId), Number(positionId));
        res.json({
            success: true,
            message: `Posisi dengan id: ${positionId} telah berhasil dihapus dari Profil dengan id:${profileId}`,
        })
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
}