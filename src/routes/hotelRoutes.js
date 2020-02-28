'use strict'
const express = require('express')

const HotelController = require('../controllers/hotelController')
const md_auth = require('../middlewares/authenticated')

var api = express.Router()


module.exports = api