const request = require("request");

//two parameters that looks for an address and if found then run the callback fucntion

const geocode = (address, callback) => {
  //This is my api url
  const url =
    "https://api.weatherstack.com/access_key=c6fcc429f9d47d7f013d94adb1ebe36c&query=37.8276,-122.4233";
  //checks if there is an error
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      //return if there is an error
      callback("Unable to connect to location services!", undefined);
      //return if there is no result
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
      //return this else statement if the others do not return
    } else {
      callback(undefined, {
        //this will target
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
        //there is no place_name but instead this is a placeholder for the location
        //long and lat are the coordinates that is found in an array called center
      });
    }
  });
};
//this is how we connect geocode to other pages
module.exports = geocode;
