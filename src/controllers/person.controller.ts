import type {Request, Response} from "express";
import {readAllPerson, readPersonById, readPersonsWithPagination, totalPerson} from "../services/person.service";
import {readProfileById} from "../services/profile.service";

export const getPersons = async (req: Request, res: Response) => {
    try {
        const persons = await readAllPerson();

        const response = persons.map(person => ({
            id: person.id,
            name: person.name,
            gender: person.gender,
            birth: person.birth,
            position: person.positions.map(p => p.position),
            team: person.teams.map(t => t.team)
        }));

        res.status(200).json({
            success: true,
            message: "Data person telah diambil",
            data: response
        });
    } catch (error) {
        res.status(500).json({message: "Error fetching persons", error});
    }
};

export const getPersonsWithPagination = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const teamId = req.query.teamId
            ? Number(req.query.teamId)
            : undefined;

        const positionId = req.query.positionId
            ? Number(req.query.positionId)
            : undefined;

        // defensive thinking
        if (page < 1 || limit < 1 || limit > 100) {
            return res.status(400).json({message: "Invalid pagination params"});
        }

        const skip = (page - 1) * limit;

        const persons = await readPersonsWithPagination(skip, limit,teamId,positionId);
        const data = persons.map(person => ({
            id: person.id,
            name: person.name,
            gender: person.gender,
            birth: person.birth,
            position: person.positions.map(p => p.position),
            team: person.teams.map(t => t.team)
        }));
        const total = await totalPerson(teamId,positionId);

        res.status(200).json({
            success: true,
            message: "Data person telah diambil",
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            },
            data: data
        });
    } catch (error) {
        res.status(500).json({message: "Error fetching persons", error});
    }
};

export const getPersonById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const rawPerson = await readPersonById(Number(id));

        if (rawPerson) {
            const response = {
                id: rawPerson.id,
                name: rawPerson.name,
                gender: rawPerson.gender,
                birth: rawPerson.birth,
                position: rawPerson.positions.map(p => p.position),
                team: rawPerson.teams.map(t => t.team)
            }
            res.status(200).json({
                success: true,
                message: "Data person telah diambil",
                data: response
            });
        }

        res.status(200).json({
            success: true,
            message: "Data person telah diambil",
            data: rawPerson
        });
    } catch (error) {
        res.status(500).json({message: "Error fetching person", error});
    }
};