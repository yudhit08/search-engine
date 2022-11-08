const Crawler = require('crawler');
const express = require('express')
const cors=require("cors");

const app = express()

const c = new Crawler();

let siteData = '';

const corsOptions ={
    origin:'*', 
    credentials:true,         
    optionSuccessStatus:200,
 }

// Queue URLs with custom callbacks & parameters
c.queue([
  {
    uri: 'https://kbbi.kemdikbud.go.id/entri/makan',

    // The global callback won't be called
    callback: (error, res, done) => {
      if (error) {
        console.log(error);
      } else {
        const $ = res.$;
        const container = $('.container');
        container.each((i, value) => {
          $(value)
            .find('h2 ,ol li, ul.adjusted-par li')
            .each((j, data) => {
              siteData += $(data).text() + '\n';
            });
        });
      }
      done();
    },
  },
]);

c.queue([
    {
      uri: 'https://kbbi.kemdikbud.go.id/entri/minum',
  
      // The global callback won't be called
      callback: (error, res, done) => {
        if (error) {
          console.log(error);
        } else {
          const $ = res.$;
          const container = $('.container');
          container.each((i, value) => {
            $(value)
              .find('h2 ,ol li, ul.adjusted-par li')
              .each((j, data) => {
                siteData += $(data).text() + '\n';
              });
          });
        }
        done();
      },
    },
  ]);

app.get('/', (req,res) => {
    let data = {result: siteData}
    res.send(JSON.stringify(data))
})

app.use(cors(corsOptions))

app.listen(8000, () => {
    console.log('server running on port 8000')
})