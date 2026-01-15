import type {Request, Response} from "express";
import {
    readAllPositions,
    createPosition,
    deletePosition,
    updatePosition,
    readPositionsWithPagination, totalPosition, readPositionsWithMembersPreview
} from "../services/position.service";
import {readAllProfileByPositionId} from "../services/profile.position.service";


export const getPositionsWithPagination = async (req: Request, res: Response) => {
    try{
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        if (page < 1 || limit < 1 || limit > 100) {
            return res.status(400).json({message: "Invalid pagination params"});
        }

        const skip = (page - 1) * limit;

        const positions = await readPositionsWithPagination(skip,limit);
        const total = await totalPosition()

        res.status(200).json({
            success: true,
            message: "Data posisi telah diambil",
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            },
            data: positions
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching positions", error });
    }
}

export const getPositionsWithMembersPreview = async (req: Request, res: Response) => {
    try{
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        if (page < 1 || limit < 1 || limit > 100) {
            return res.status(400).json({message: "Invalid pagination params"});
        }

        const skip = (page - 1) * limit;
        const positions = await readPositionsWithMembersPreview(skip, limit);
        const total = await totalPosition()

        const mapped = positions.map(position => ({
            id: position.id,
            name: position.name,
            memberCount: position._count.profiles,
            previewImages: position.profiles
                .map(p => p.profile.profileImage[0]?.image ?? null)
                .filter(Boolean), // buang null
            created_at: position.created_at,
            updated_at:position.updated_at
        }));

        res.status(200).json({
            success: true,
            message: "Data posisi telah diambil",
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            },
            data: mapped
        });
    }catch (error) {
        res.status(500).json({ message: "Error fetching positions", error });
    }
}

export const getPositions = async (req: Request, res: Response) => {
    try{
        const positions = await readAllPositions();

        res.status(200).json({
            success: true,
            message: "Data posisi telah diambil",
            data: positions
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching positions", error });
    }
};

export const getProfilesByPositionId = async (req: Request, res: Response) => {
    try{
        const { positionId } = req.params;

        const positions = await readAllProfileByPositionId(Number(positionId));

        res.status(200).json({
            success: true,
            message: "Data profil telah diambil",
            data: positions
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching profiles", error });
    }
};




export const postPosition = async (req:Request, res: Response) => {
    try {
        const { name } = req.body;
        const newPosition = await createPosition(name);

        res.status(201).json({
            success: true,
            message: "Data posisi terbaru telah ditambahkan",
            data: newPosition
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating position", error });
    }
};

export const putPosition = async (req:Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updatedPosition = await updatePosition(Number(id), name);

        res.status(201).json({
            success: true,
            message: `Data posisi dengan id: ${id} telah diperbaharui`,
            data: updatedPosition
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating position", error });
    }
};

export const erasePosition = async (req:Request, res: Response) => {
    const { id } = req.params;
    try {
        await deletePosition(Number(id));
        res.json({
            success: true,
            message: `Position dengan id: ${id} telah berhasil dihapus`,
        })
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}