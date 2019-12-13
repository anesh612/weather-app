const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const app = express()
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Anesh Kaul'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Anesh Kaul'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address)
        return res.send({
            error: 'You must provide an address!'
        })
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error)
            return res.send({ error })
        forecast(latitude, longitude, (error, forecast) => {
            if (error)
                return res.send({ error })
            res.send({
                forecast,
                location,
                address: req.query.address 
            }) 
        })
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Anesh Kaul',
        helpText: 'Help and Support.' 
    })
})
app.get('/help/*', (req, res) => {
    res.render('errors', {
        title: '404',
        errorText: 'Help article not found.',
        name: 'Anesh Kaul'
    })
})
app.get('*', (req, res) => {
    res.render('errors', {
        title: '404',
        errorText: 'Page not found.',
        name: 'Anesh Kaul'
    })
})
app.listen(3000)