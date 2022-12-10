import usetube from "usetube";

let scraping = "";
export const ytScraping = async (req, res) => {
    scraping = ""
    try {
        const query = encodeURI(req.body.query)
        const cari = await usetube.searchVideo(query);
        let data = {}
        cari.videos.map((data) => {
            scraping += data.id + " "
        })

        data = { result: scraping };
        res.status(201).json(data);
        console.log(data);
    } catch (error) {
        console.log(error.message);
    }
};

export const getDataYtCrawling = (req, res) => {
    try {
        res.status(201).json(scraping);
        //scraping = ""
    } catch (error) {
        console.log(error.message);
    }
};
