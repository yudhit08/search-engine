import kalimat from "../models/kalimatModel.js";

export const addKalimat = async (req, res) => {
    try {
        await kalimat.create(req.body)
        console.log(req.body)
        res.status(201).json({msq: "kalimat added"})
    } catch (error) {
        console.log(error.message);
    }
}

export const getKalimat = async (req,res) => {
    try {
        const response = await kalimat.findAll()
        res.status(201).json(response)
    } catch (error) {
        console.log(error.message)
    }
}