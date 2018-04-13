# liri-node-app

## About
This is a command-line node app. To use, in the terminal type
```
node liri.js <command> <argument>
``` 

## Commands
1. `my-tweets`
    * `<argument>`: none
    * Shows the last 20 tweets for the hardcoded twitter user @apitestground. 
2. `spotify-this-song`
    * `<argument>`: name of song
    * If a name isn't provided, searches for "The Sign"
    * Lists the artist, song name, spotify link, and album
3. `movie-this`
    * `<argument>`: title of movie
    * If a title isn't provided, searches for "Mr. Nobody"
    * Data from OMDB
    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Rotten Tomatoes Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.

4. `do-what-it-says`
    * `<argument>`: none
    * reads `random.txt` and runs the command in there.
    * Within `random.txt` syntax is `<command>,<arguments>`, e.g. `spotify-this-song,"I Want it That Way"`

## Logging
All inputs and outputs are stored in `log.txt`.
