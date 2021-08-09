const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./template/utils/geocode.js')
const forecast = require('./template/utils/forecast.js')
const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__filename, '../public')
const templatePath = path.join(__dirname, './template/views')
const partialsPath = path.join(__dirname, './template/partials')
app.set('view engine', 'hbs')
app.set('views', templatePath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather '
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'test help'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'test about'
    })
})


app.get('/wheather', (req, res) => {
    if (!req.query.adress) {
        return res.send({
            error: 'Address not found error'
        })
    }
    geocode.geocode(req.query.adress, (error, { longitude, latitude, place_name } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast.forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                forecast: forecastData,
                place_name,
                address: req.query.adress
            })

        })
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'help not found error'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        error: '404 not found error'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})