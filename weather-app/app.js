const request = require("request");

const url =
  "http://api.weathearstack.com/current?access_key=c6fcc429f9d47d7f013d94adb1ebe36c&query=37.8276,-122.4233";

request({ url: url }, (error, response) => {
  const data = JSON.parse(response.body);
  console.log(data.current);
});

//new section
// console.log("Starting");

// setTimeout(() => {
//   console.log("2 second Timer");
// }, 2000);
// setTimeout(() => {
//   console.log("0 second Timer");
// }, 0);

// console.log("Stopping");

//weather app section
const geocode = require("./utils");
//the pathing to find forecast inside of utils
const forecast = require("/.utils/forecast");

const address = process.argv[2];

if (!address) {
  //if the condition is true meaning the address does not exist then return the message
  console.log("Please provdie an address");
} else {
  geocode("Boston", (error, data) => {
    //if error then return this error message
    if (error) {
      return console.log(error);
    }
    //returns the location
    forecast(data.latitude, data.longitude, (error, forecastData) => {
      //if error then return this error message
      if (error) {
        return console.log(error);
      }
      //returns the location
      console.log(data.location);
    });
  });
}
console.log(process.argv);
