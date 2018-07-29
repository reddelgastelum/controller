let express = require('express');
let cron = require('node-cron');
let request = require('request');

let app = express();

let weather = function() {
  request('http://api.apixu.com/v1/current.json?key=fc298435117e47388f320914182707&q=Upland', function(error, response, body) {
    if (error) throw error;

    if (response.statusCode === 200) {
      let data = JSON.parse(body);
      return data;
    }
  });
};

app.get('/', function(req, res) {
  let w = weather();
  res.send(w.current.conditions.text);
});

cron.schedule('* * * * *', function() {
  console.log('Hello from Cron');
});

app.listen(3000);
