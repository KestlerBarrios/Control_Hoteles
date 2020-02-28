'use strict'

const express = require('express')
const cors = require('cors')
const app = express()
const bodyparser = require('body-parser')

// const hotel_ROUTES = require('./routes/hotelRoutes')


app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.use(cors())

module.exports = app