'use strict'
const express = require('express')

const HotelController = require('../controllers/hotelController')
const md_auth = require('../middlewares/authenticated')

var api = express.Router()

api.put('/editar-hotel/:id', md_auth.ensureAuth, HotelController.editarHotel)
api.delete('/eliminar-hotel/:id', md_auth.ensureAuth, HotelController.eliminarHotel)
api.get('/listar-hoteles', md_auth.ensureAuth, HotelController.listarHoteles)

module.exports = api