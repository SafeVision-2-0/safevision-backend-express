import type {Request, Response} from "express";
import {readAllPerson,readPersonById} from "../services/person.service";
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