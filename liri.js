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
          log(i.artists[0].name);
          log(i.name);
          log(i.preview_url);
          log(i.album.name);
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
    // log(response);
    log(response.Title);
    log(response.Year);
    log(response.Ratings[0]);
    log(response.Ratings[1]);
    log(response.Country);
    log(response.Language);
    log(response.Plot);
    log(response.Actors);
  }).catch(e => {
    if(e) throw e;
  })
}

function runCmdFromFile() {
  fs.readFile('random.txt', 'utf8', (err, data) => {
    [cmd, args] = data.split(',');
    runCommand(cmd, args);
  })
}

runCommand(process.argv[2], process.argv.splice(3).join(" "));