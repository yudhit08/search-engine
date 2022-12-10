import { Op } from "sequelize";
import image from "../models/imageModel.js";

export const addImage = async (req, res) => {
    try {
        await image.create(req.body)
        console.log(req.body)
        res.status(201).json({msq: "image added"})
    } catch (error) {
        console.log(error.message);
    }
}

export const getImage = async (req,res) => {
    try {
        const response = await image.findAll({
            where: {
                alt: {
                    [Op.like]: `%${req.query.alt}%`
                }
            }
        })
        res.status(201).json(response)
    } catch (error) {
        console.log(error.message)
    }
}