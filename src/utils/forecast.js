const request = require('request');
const chalk = require('chalk');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=d3e21b2bceac3af24c334b5d4b1921a9&query=${latitude},${longitude}&units=m`
    
    //request({ url: url, json: true}, (error, response) => {

    // Refactoring the above code using Object Destructuring
    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback(chalk.red('Unable to connect to weather service'), undefined)
        } else if (body.success === false) {
            callback(chalk.red('Cannot find weather service for the given location'), undefined)
        } else {
            callback(undefined, {
                // Location: `${response.body.location.region}, ${response.body.location.name}, ${response.body.location.country}`,
                Location: `${body.location.region}, ${body.location.name}, ${body.location.country}`,
                Temperature: `${body.current.temperature}°C`,
                Forecast: `${body.current.weather_descriptions[0]}`,
                Feelslike: `${body.current.feelslike}°C`,
                Humidity: `${body.current.humidity}%`
            })
        }
    })
}

module.exports = forecast