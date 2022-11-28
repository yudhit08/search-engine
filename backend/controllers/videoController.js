import video from "../models/videoModel.js";

export const addVideo = async (req, res) => {
    try {
        await video.create(req.body)
        console.log(req.body)
        res.status(201).json({msq: "video added"})
    } catch (error) {
        console.log(error.message);
    }
}

export const getVideo = async (req,res) => {
    try {
        const response = await video.findAll()
        res.status(201).json(response)
    } catch (error) {
        console.log(error.message)
    }
}