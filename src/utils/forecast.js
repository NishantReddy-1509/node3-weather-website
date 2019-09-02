const request = require('request')

const forecast = (lattitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/0fb18861510a429f752b0185c19055e4/'+ encodeURIComponent(lattitude) + ',' + encodeURIComponent(longitude) +'?units=si'
    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else{
            callback(undefined, body.daily.data[0].summary + ' It is currently '+ body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast
