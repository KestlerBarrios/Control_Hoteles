'use strict'
const express = require('express')

const UserController = require('../controllers/userController')
const md_auth = require('../middlewares/authenticated')

var api = express.Router()
api.post('/registrar-hotel', UserController.registrarHotel)
api.post('/registrar-cliente', UserController.registrarCliente)
api.post('/login', UserController.login )

module.exports = api