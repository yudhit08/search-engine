import request from "request";
import { load } from "cheerio";

let siteData = "";
export const scraping = async (req, res) => {
    let url = req.body.url;
    request(url, function (err, res, body) {
        if (err && res.statusCode !== 200) throw err;

        let $ = load(body);
        let dataSite = "";
        $("body").each((i, value) => {
            $(value)
                .find("img")
                .each((j, data) => {
                    //$(data).find("sup").replaceWith("");
                    //return process.stdout.write($(data).text() + '\n');
                    dataSite += $(data);
                });
            //process.stdout.write('\n');
        });
        siteData = dataSite;
    });
    let data = { result: siteData };
    console.log(data);
    res.status(201).json(data);
};

export const getDataScraping = (req, res) => {
    try {
        res.status(201).json(siteData);
        siteData = "";
    } catch (error) {
        console.log(error.message);
    }
};
