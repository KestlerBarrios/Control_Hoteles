'use strict'

//Creacion del tokem y contenido

const jwt = require('jwt-simple')
const moment = require('moment')

const secret = 'password'

exports.createToken = function(hotel) {
    var payload = {
        sub: hotel._id,
        nombre: hotel.nombre,
        usuario: hotel.usuario,
        email: hotel.email,
        rol: hotel.rol,
        iat: moment().unix(),
        exp: moment().day(30, 'days').unix()
    }
    return jwt.encode(payload, secret)
}