const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9f016ca9e6fb35a74e96de6201e319f6/' + latitude + ',' + longitude
    request({url, json: true},(error, { body }) => {
        if(error)
            callback('Unable to connect to forecast service!', undefined)
        else if(body.error)
            callback('Unable to find location', undefined)
        else
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.' + 'The high temperature for today is ' + body.daily.data[0].temperatureHigh + ' degress and the low temperature for today is ' + body.daily.data[0].temperatureLow + ' degrees.')
    })     
}
module.exports = forecast