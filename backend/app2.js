const request = require('request');
const cheerio = require('cheerio');

let url = 'https://kbbi.kemdikbud.go.id/entri/makan';

request(url, function (err, res, body) {
    if (err && res.statusCode !== 200) throw err;

    let $ = cheerio.load(body);
    $('.container').each((i, value) => {
        $(value).find('h2 ,ol li, ul.adjusted-par li').each((j, data) => {
            return process.stdout.write($(data).text() + '\n');
        });
        process.stdout.write('\n');
    });
});