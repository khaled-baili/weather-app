const request = require('postman-request')

const geocode = (adresse, callback) => {
    const url_geo = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + adresse + '.json?access_token=pk.eyJ1Ijoia2hhbGVkLWJhaWxpIiwiYSI6ImNrcnplamcwdTE5c3IydXFqczVpM3N6NGgifQ.wOwT4-WTHFA6vnTTuP8gYA'
    request({ url: url_geo, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect', undefined)
        } else if (body.features.length === 0) {
            callback('location does not exist . try another search', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                place_name: body.features[0].place_name

            })
        }
    })
}

module.exports = {
    geocode: geocode
}