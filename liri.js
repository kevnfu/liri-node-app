require('dotenv').config();
let fs = require('fs');
let keys = require('./keys.js');
let Twitter = require('twitter');
let Spotify = require('node-spotify-api');
let request = require('request-promise-native');

let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);

function log(text) {
  console.log(text);
  fs.appendFile("log.txt", text  + '\n', err => {
    if(err) throw err;
  });
}

function runCommand(cmd, args) {
  log(cmd + ',' + args);
  switch(cmd) {
    case 'my-tweets':
      recentTweets(); break;
    case 'spotify-this-song':
      songInfo(args); break;
    case 'movie-this':
      movieInfo(args); break;
    case 'do-what-it-says':
      runCmdFromFile(); break;
    default:
      log("Not a valid command");
  }
}

function recentTweets() {
  client.get('statuses/home_timeline.json', {count: 20})
      .then(tweets => {
        tweets.forEach(t => {
          log(t.created_at);
          log(t.text);
          log('');
        });
      }).catch(e => {
        if(e) throw e;
      });
}

function songInfo(name) {
  name = name || 'The Sign';
  spotify.search({type: 'track', query: name, limit: 20})
      .then(data => {
        data.tracks.items.forEach(i => {
          log('Artist: ' + i.artists[0].name);
          log('Name: ' + i.name);
          log('URL: ' + i.preview_url);
          log('Album: ' + i.album.name);
          log('');
        })
      }).catch(e => {
        if(e) throw e;
      });
}

function movieInfo(title) {
  title = title || "Mr. Nobody";

  request({
    uri: `http://www.omdbapi.com/`,
    qs: {
      apikey: process.env.OMDB_KEY,
      t: title
    },
    json: true
  }).then(response => {
    log('Title: ' + response.Title);
    log('Year: ' + response.Year);
    log(response.Ratings[0].Source + ": " + response.Ratings[0].Value);
    log(response.Ratings[1].Source + ": " + response.Ratings[1].Value);
    log('Country: ' + response.Country);
    log('Languages: ' + response.Language);
    log('Plot: ' + response.Plot);
    log('Actors: ' + response.Actors);
  }).catch(e => {
    if(e) throw e;
  })
}

function runCmdFromFile() {
  fs.readFile('random.txt', 'utf8', (err, data) => {
    [cmd, args] = data.split(',');
    runCommand(cmd, args);
  });
}

// run command line argument
[,,cmd, ...arg] = process.argv;
runCommand(cmd, arg.join(' '));