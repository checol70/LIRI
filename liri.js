
var dot = require("dotenv").config();
var Spotify = require('node-spotify-api');
var request = require("request");
var keys = require("./keys");
var Twitter = require("twitter");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var command = process.argv[2]
var params = {
    count: 20
}
var term = process.argv[3];
var fs = require("fs");
function run() {
    if (command === "my-tweets") {
        client.get("statuses/user_timeline", params, function (error, tweets, response) {
            if (error) {
                console.log(error)
                return console.log("error occurred: " + error);
            } else {
                console.log("==================================");
                tweets.forEach((e) => {
                    console.log(e.created_at);
                    console.log(e.text);
                    console.log("==================================");
                });
            }
        })
    }



    if (command === "spotify-this-song") {
        var track = term;
        if (process.argv.length > 4) {
            for (var i = 4; i < process.argv.length; i++) {
                track += " ";
                track += process.argv[i];
            }
        }
        if (track === undefined) {
            track = "The Sign ace of base";
        }
        spotify.search({ type: 'track', query: track }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            } else {
                if (data.tracks.items[0] !== null || data.tracks.items[0] !== undefined) {

                    data.tracks.items[0].artists.forEach(function (e, i) {
                        console.log("artist " + i + " = " + e.name);
                    })
                    console.log("Title: " + data.tracks.items[0].name);
                    if (data.tracks.items[0].preview_url !== null) {
                        console.log("preview at " + data.tracks.items[0].preview_url)
                    } else {
                        console.log("no preview found, so here is a link to it on spotify: " + data.tracks.items[0].external_urls.spotify)
                    }
                    console.log("On Album: " + data.tracks.items[0].album.name);
                }
            }
        })
    }
    if (command === "movie-this") {
        title = term;
        if (title === undefined) {
            title = "Mr. Nobody"
        }
        request("http://www.omdbapi.com/?apikey=trilogy&t=" + title, function (error, response, body) {
            if (error) {
                return console.log(error);
            }
            else {
                b = JSON.parse(body);
                console.log(b.Title);
                console.log(b.Year)
                console.log(b.Ratings[1])
                console.log(b.Ratings[0])
                console.log(b.Country)
                console.log(b.Language)
                console.log(b.Plot)
                console.log(b.Actors)
            }
        })
    }
}
if (command === "do-what-it-says") {
    fs.readFile("./random.txt", "utf8", (err, data)=>{
        if(err){
            return console.log(err);
        }else{
            strs = data.split(",",2);
            command = strs[0]
            term = strs[1];
            run();
        }
    })
}
else {
    run()
}
