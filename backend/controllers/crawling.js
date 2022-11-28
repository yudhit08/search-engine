import Crawler from "crawler";

const c = new Crawler();

let siteData = "";
export const crawling = async (req, res) => {
    try {
        console.log(req.body);

        c.queue([
            {
                uri: req.body.url,

                // callback: (error, res, done) => {
                //     if(error) {
                //         console.log(error)
                //     } else {
                //         let dataSite = ""
                //         const $ = res.$
                //         const container = $('.sense-group')
                //         container.each((i, value) => {
                //             console.log($(value).text())
                //             $(value)
                //             .find('.dict-entry')
                //             .each((j, data) => {
                //                 dataSite += $(data).text() + '\n'
                //             })
                //         })
                //         siteData = dataSite
                //     }
                //     done()
                // }

                //WIKIPEDIA.COM
                callback: (error, res, done) => {
                    if (error) {
                        console.log(error);
                    } else {
                        let dataSite = ""
                        const $ = res.$;
                        const container = $(".mw-parser-output");
                        container.each((i, value) => {
                            $(value)
                            .find('p, ul')
                            .each((j, data) => {
                                $(data)
                                .find('sup')
                                .replaceWith("")
                                dataSite += $(data).text();
                            })
                        });
                        siteData = dataSite
                    }
                    done()
                }

                //GOOGLE_IMAGES.COM
                // callback: (error, res, done) => {
                //     if (error) {
                //         console.log(error);
                //     } else {
                //         let dataSite = ""
                //         const $ = res.$;
                //         const container = $("body");
                //         container.each((i, value) => {
                //             $(value)
                //             .find("img")
                //             .each((j, data) => {
                //                 dataSite += $(data)
                //             })
                //         });
                //         siteData = dataSite
                //     }
                //     done()
                // }

                //GOOGLE_VIDEO.COM
                // callback: (error, res, done) => {
                //     if (error) {
                //         console.log(error);
                //     } else {
                //         let dataSite = ""
                //         const $ = res.$;
                //         const container = $("body");
                //         container.each((i, value) => {
                //             $(value)
                //             .find("img")
                //             .each((j, data) => {
                //                 dataSite += $(data)
                //             })
                //         });
                //         siteData = dataSite
                //     }
                //     done()
                // }

                // callback: (error, res, done) => {
                //     if (error) {
                //         console.log(error);
                //     } else {
                //         let dataSite = ""
                //         const $ = res.$;
                //         const container = $(".thesaurus_group");
                //         container.each((i, value) => {
                //             $(value)
                //             .find(".word_description")
                //             .each((j, data) => {
                //                 dataSite += $(data).text() + ". "
                //             })
                //         })
                //         //console.log(dataSite)
                //         siteData = dataSite
                //     }
                //     done();
                // },

                // callback: (error, res, done) => {
                //     if (error) {
                //         console.log(error);
                //     } else {
                //         let dataSite = ""
                //         const $ = res.$;
                //         const container = $(".container");
                //         container.each((i, value) => {
                //             $(value)
                //                 .find("h2 ,ol li, ul.adjusted-par li")
                //                 .each((j, data) => {
                //                     dataSite += $(data).text() + "\n";
                //                 });
                //         });
                //         siteData = dataSite
                //     }
                //     done();
                // },
            },
        ]);
        let data = { result: siteData };
        console.log(data)
        res.status(201).json(data);
    } catch (error) {
        console.log(error.message);
    }
};

export const getDataCrawling = (req, res) => {
    try {
        res.status(201).json(siteData);
    } catch (error) {
        console.log(error.message);
    }
};
