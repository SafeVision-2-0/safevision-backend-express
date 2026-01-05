import type {Request, Response} from "express";
import {getAllPositions,createPosition, deletePosition, updatePosition} from "../services/position.service";


export const getPositions = async (req: Request, res: Response) => {
    try{
        const positions = await getAllPositions();

        res.status(200).json({
            success: true,
            message: "Data posisi telah diambil",
            data: positions
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching positions", error });
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
        res.status(500).json({ message: "Error creating position", error });
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