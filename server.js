var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
  // Let's scrape ocotodex
  url = 'https://octodex.github.com';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var link;
      var json = { link : ""};

      $('.item a').each(function(){
        var data = $(this);
        var name = data.first().children().attr('data-src');
        json.link = url + name;
      })

      // $('.ratingValue').filter(function(){
      //   var data = $(this);
      //   rating = data.text().trim();
      //
      //   json.rating = rating;
      // })
    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your console!')
  })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
