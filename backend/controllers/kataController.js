import { Op } from "sequelize";
import kata from "../models/kataModel.js";

export const addKata = async (req, res) => {
    try {
        await kata.create(req.body)
        console.log(req.body)
        res.status(201).json({msq: "kata added"})
    } catch (error) {
        console.log(error.message);
    }
}

export const getKata = async (req,res) => {
    try {
        const response = await kata.findAll()
        res.status(201).json(response)
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteKata = async (req,res) => {
    try {
        await kata.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json({message: "Kata deleted"})
    } catch (error) {
        console.log(error.message)
    }
}

export const updateKata = async (req, res) => {
    try {
        await kata.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.json({message: "Kata updated"})
    } catch (error) {
        console.log(error.message)
    }
}