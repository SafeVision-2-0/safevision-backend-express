import type {Request, Response} from "express";
import {getAllTeams,createTeam, deleteTeam, updateTeam} from "../services/team.service";
import {readAllProfileByTeamId} from "../services/profile.team.service";
import {readAllProfileByPositionId} from "../services/profile.position.service";


export const getTeams = async (req: Request, res: Response) => {
    try{
        const teams = await getAllTeams();

        res.status(200).json({
            success: true,
            message: "Data tim telah diambil",
            data: teams
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching teams", error });
    }
};

export const getProfilesByTeamId = async (req: Request, res: Response) => {
    try{
        const { teamId } = req.params;

        const teams = await readAllProfileByTeamId(Number(teamId));

        res.status(200).json({
            success: true,
            message: "Data tim telah diambil",
            data: teams
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching teams", error });
    }
};


export const postTeam = async (req:Request, res: Response) => {
    try {
        const { name } = req.body;
        const newTeam = await createTeam(name);

        res.status(201).json({
            success: true,
            message: "Data tim terbaru telah ditambahkan",
            data: newTeam
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating team", error });
    }
};

export const putTeam = async (req:Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updatedTeam = await updateTeam(Number(id), name);

        res.status(201).json({
            success: true,
            message: `Data tim dengan id: ${id} telah diperbaharui`,
            data: updatedTeam
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating team", error });
    }
};

export const eraseTeam = async (req:Request, res: Response) => {
    const { id } = req.params;
    try {
        await deleteTeam(Number(id));
        res.json({
            success: true,
            message: `Team dengan id: ${id} telah berhasil dihapus`,
        })
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}