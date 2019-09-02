const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define Paths for Express Config
const publicDirectoryPath =  path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Define handlebars engine and Views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title:'Weather',
        name: 'Nishant Reddy'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Nishant Reddy'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Nishant Reddy'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {lattitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(lattitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Nishant Reddy',
        errorMessage: 'Help Article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Nishant Reddy',
        errorMessage: 'Page Not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})