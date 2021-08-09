const request = require('postman-request')


const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4d5aa1ba15f8263dd858e9d0bb1216ba&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect', undefined)
        } else if (body.error) {
            callback('wrong location try another serach', undefined)
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                speed_wind: body.current.wind_speed
            })
        }

    })
}

module.exports = {
    forecast: forecast
}