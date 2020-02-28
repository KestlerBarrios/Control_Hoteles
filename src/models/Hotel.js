'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var HotelSchema = Schema({
    nombre: String,
    usuario: String,
    email: String,
    password: String,
    dueño: String,
    calificacion: Number
})

module.exports = mongoose.model('hotel', HotelSchema)