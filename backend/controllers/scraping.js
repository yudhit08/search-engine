import Crawler from "crawler";

const c = new Crawler();

let siteData = "";
export const scraping = async (req, res) => {
    try {
        console.log(req.body);
        
        c.queue([
            {
                uri: req.body.url,

                //WIKIPEDIA.COM
                // callback: (error, res, done) => {
                //     if (error) {
                //         console.log(error);
                //     } else {
                //         let dataSite = ""
                //         const $ = res.$;
                //         const container = $(".mw-parser-output");
                //         container.each((i, value) => {
                //             $(value)
                //             .find('p, ul')
                //             .each((j, data) => {
                //                 $(data)
                //                 .find('sup')
                //                 .replaceWith("")
                //                 dataSite += $(data).text();
                //             })
                //         });
                //         siteData = dataSite
                //     }
                //     let data = { result: siteData };
                //     console.log(data)
                //     res.status(201).json(data);
                //     done()
                // }

                // GOOGLE_IMAGES.COM
                callback: (error, res, done) => {
                    if (error) {
                        console.log(error);
                    } else {
                        let dataSite = ""
                        siteData = ""
                        const $ = res.$;
                        const container = $("body");
                        container.each((i, value) => {
                            $(value)
                            .find("img")
                            .each((j, data) => {
                                dataSite += $(data)
                            })
                        });
                        siteData = dataSite
                    }
                    done()
                }
            },
        ]);
        let data = { result: siteData };
        console.log(data)
        res.status(201).json(data);
        siteData = ""
    } catch (error) {
        console.log(error.message);
    }
};

export const getDataScraping = (req, res) => {
    try {
        res.status(201).json(siteData);
        siteData = ""
    } catch (error) {
        console.log(error.message);
    }
};
