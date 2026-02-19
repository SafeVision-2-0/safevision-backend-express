import type {Request, Response} from "express";
import {createProfileTeam, deleteProfileTeam, readAllTeamByProfileId} from "../services/profile.team.service";

export const postProfileTeam = async (req: Request, res: Response) => {
    try {
        const {profileId, teamId} = req.body;
        const newProfile = await createProfileTeam(
            Number(profileId),
            Number(teamId),
        );
        res.status(201).json({
            success: true,
            message: `Tim dengan id: ${teamId} telah berhasil ditambahkan ke Profil dengan id:${profileId}`,
            data: newProfile
        });
    } catch (error) {
        res.status(500).json({message: "Error adding team to profile", error});
    }
};

export const eraseProfileTeam = async (req: Request, res: Response) => {
    const {profileId, teamId} = req.params;

    try {
        await deleteProfileTeam(Number(profileId), Number(teamId));
        res.json({
            success: true,
            message: `Tim dengan id: ${teamId} telah berhasil dihapus dari Profil dengan id:${profileId}`,
        })
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
}