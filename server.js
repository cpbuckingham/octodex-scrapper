var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();


app.get('/', function(req, res){
  const url = 'https://octodex.github.com';
  var arr =[];

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);
        $('.item a').each(function (index, value){
          listing = $(this).first().children().attr('data-src');
          if (listing !== undefined){
          var final= url+listing;
          arr.push(final);
          }
        });
              // console.log(arr)
        function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
          }
              console.log(arr[getRandomInt(0,arr.length)]);
      }
    })
  })

app.listen('8080')
console.log('Refresh 8080');
exports = module.exports = app;
