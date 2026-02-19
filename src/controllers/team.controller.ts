import type {Request, Response} from "express";
import {
    getAllTeams,
    createTeam,
    deleteTeam,
    updateTeam,
    readTeamsWithPagination,
    totalTeam, readTeamsWithMembersPreview
} from "../services/team.service";
import {readAllProfileByTeamId} from "../services/profile.team.service";


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

export const getTeamsWithMembersPreview = async (req: Request, res: Response) => {
    try{
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        if (page < 1 || limit < 1 || limit > 100) {
            return res.status(400).json({message: "Invalid pagination params"});
        }

        const skip = (page - 1) * limit;
        const teams = await readTeamsWithMembersPreview(skip, limit);
        const total = await totalTeam()

        const mapped = teams.map(team => ({
            id: team.id,
            name: team.name,
            memberCount: team._count.profiles,
            previewImages: team.profiles
                .map(p => p.profile.profileImage[0]?.image ?? null)
                .filter(Boolean), // buang null
            created_at: team.created_at,
            updated_at:team.updated_at
        }));

        res.status(200).json({
            success: true,
            message: "Data tim telah diambil",
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            },
            data: mapped
        });
    }catch (error) {

    }
}

export const getTeamsWithPagination = async (req: Request, res: Response) => {
    try{
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        if (page < 1 || limit < 1 || limit > 100) {
            return res.status(400).json({message: "Invalid pagination params"});
        }

        const skip = (page - 1) * limit;

        const teams = await readTeamsWithPagination(skip,limit);
        const total = await totalTeam()

        res.status(200).json({
            success: true,
            message: "Data tim telah diambil",
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            },
            data: teams
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching teams", error });
    }
}


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