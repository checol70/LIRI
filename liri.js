
var dot = require("dotenv").config();
var Spotify = require('node-spotify-api');
var request = require("request");
var keys = require("./keys");
var Twitter = require("twitter");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var command = process.argv[2]
var params = {
    count:20
}

if (command === "my-tweets") {
    client.get("statuses/user_timeline",params, function(error, tweets, response){
        if(error){
            console.log(error)
            return console.log("error occurred: " + error);
        }else{
            console.log("==================================");
            tweets.forEach((e)=>{
                console.log(e.created_at);
                console.log(e.text);
                console.log("==================================");
            }); 
        }
    })
}



if (command === "spotify-this-song") {
    var track = process.argv[3];
    if (process.argv.length > 4) {
        for (var i = 4; i < process.argv.length; i++) {
            track += " ";
            track += process.argv[i];
        }
    }
    spotify.search({ type: 'track', query: track }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            if (data.tracks.items[0] !== null || data.tracks.items[0] !== undefined) {
                
                data.tracks.items[0].artists.forEach(function (e, i) {
                    console.log("artist "+i +" = "+ e.name);
                })
                console.log("Title: "+data.tracks.items[0].name);
                if (data.tracks.items[0].preview_url !== null) {
                    console.log("preview at "+ data.tracks.items[0].preview_url)
                } else {
                    console.log("no preview found, so here is a link to it on spotify"+data.tracks.items[0].external_urls.spotify)
                }
                console.log("On Album: "+data.tracks.items[0].album.name);
            }
        }
    })
}
if (command === "movie-this") {
    console.log("movieing")
}
if (command === "do-what-it-says") {
    console.log("doing")
}
