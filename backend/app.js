const Crawler = require('crawler');

const c = new Crawler({
    maxConnections: 10,
    // This will be called for each crawled page
    callback: (error, res, done) => {
        if (error) {
            console.log(error);
        } else {
            const $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            console.log($('title').text());
        }
        done();
    }
});

// Queue just one URL, with default callback
c.queue('http://www.amazon.com');

// Queue a list of URLs
c.queue(['http://www.google.com/','http://www.yahoo.com']);

// Queue URLs with custom callbacks & parameters
c.queue([{
    uri: 'https://kbbi.kemdikbud.go.id/entri/makan',

    // The global callback won't be called
    callback: (error, res, done) => {
        if (error) {
            console.log(error);
        } else {
            const $ = res.$;
            const container = 
            $('.container');
            container.each((i, value) => {
                $(value).find('h2 ,ol li, ul.adjusted-par li').each((j, data) => {
                    console.log($(data).text());
                });
            });
        }
        done();
    }
}]);