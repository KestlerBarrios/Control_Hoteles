'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var ClienteSchema = Schema({
    nombre: String,
    usuario: String,
    email: String,
    password: String,
})

module.exports = mongoose.model('cliente', ClienteSchema)