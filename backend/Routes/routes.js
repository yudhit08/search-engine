import express from "express";
import {
    addKata,
    getKata,
    deleteKata,
    updateKata,
} from "../controllers/kataController.js";
import { addKalimat, getKalimat } from "../controllers/kalimatController.js";
import { addImage, getImage } from "../controllers/imageController.js";
import { crawling, getDataCrawling } from "../controllers/crawling.js";
import { addVideo, getVideo } from "../controllers/videoController.js";

const router = express.Router();

router.get("/kata", getKata);
router.post("/kata", addKata);
router.delete("/kata/:id", deleteKata);
router.patch("/kata/:id", updateKata);

router.get("/kalimat", getKalimat);
router.post("/kalimat", addKalimat);

router.get("/image", getImage);
router.post("/image", addImage);

router.get("/video", getVideo);
router.post("/video", addVideo);

router.get("/crawling", getDataCrawling);
router.post("/crawling", crawling);

export default router;
