const request = require("request");
//this is looking at my numbers for lat and long in the url.
//also a variable and function is declared here

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.weatherstack.com/access_key=c6fcc429f9d47d7f013d94adb1ebe36c&query=37.8276,-122.4233";
  //a request is made and depended on whether it retrieves it or not the if conditions
  //will decide what the call back function is
  request({ url, json: true }, (error, { body }) => {
    //if there is an error then run the callback function of string
    if (error) {
      callback("Unable to connect to weather service!", undefined);
      //return if there is no result
    } else if (body.error) {
      callback("Unable to find location", undefined);
      //no matter what return this
    } else {
      callback(
        undefined,
        //this will target insde the data for the specific data and include the string after
        body.daily.data[0].summary +
          " It is currently " +
          body.currently.temperature +
          " degress out. There is a " +
          body.currently.precipProbability +
          "% chance of rain."
      );
    }
  });
};
//this is how we connect forecast to other pages
//does not go both ways
module.exports = forecast;
