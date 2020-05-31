const request = require('request');
const chalk = require('chalk');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicHJpbmNlZCIsImEiOiJja2E4anJ4aGswZG1wMnlwNDRvaDBrczEwIn0.XVKh_KzmfEgKuVfTPxl3Bg&limit=1`

    request({
        url,
        json: true
    }, (error, {body}) => { // Object Destructuring body from the response object
            if (error) {
                callback(chalk.red('Unable to connect to Geolocation service'), undefined)
            } else if (body.features.length === 0) {
                callback(`Unable to connect to the ${address} service`, undefined)
            } else {
                callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                });
            }
    })
}

module.exports = geocode