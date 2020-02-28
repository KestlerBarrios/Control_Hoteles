'use strict'

const bcrypt = require('bcrypt-nodejs')

const Hotel = require("../models/Hotel")
const jwt = require('../services/jwt')

function registrarHotel(req, res) {
    var hotel = new Hotel()
    var params = req.body

    if (params.nombre && params.password && params.email) {
        hotel.nombre = params.nombre
        hotel.usuario = params.usuario
        hotel.email = params.email
        hotel.rol = "ROLE_ADMIN"
        hotel.find({ $or: [{ usuario: hotel.usuario }, { email: hotel.email }] }).exec((err, hoteles) => {
            if (err) return res.status(500).send({ message: 'Error en la peticion.' })
            if (hoteles && hoteles.length >= 1) {
                return res.status(500).send({ message: 'El Hotel ya existe.' })
            } else {
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    hotel.password = hash
                    hotel.save((err, hotelGuardado) => {
                        if (err) return res.status(500).send({ message: 'Error al guardar el Hotel.' })
                        if (hotelGuardado) {
                            res.status(200).send({ hotel: hotelGuarHotel })
                        } else {
                            res.status(404).send({ message: `No se ha podido registrar el ${params.nombre} ` })
                        }
                    })
                })
            }
        })
    } else {
        res.status(200).send({ message: 'Rellene todos los datos necesarios.' })
    }
}

function login(req, res) {
    const params = req.body
    Hotel.findOne({ email: params.email }, (err, hotel) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (hotel) {
            bcrypt.compare(params.password, hotel.password, (err, check) => {
                if (check) {
                    if (params.gettoken) {
                        return res.status(200).send({ token: jwt.createToken(hotel) })
                    } else {
                        hotel.password = undefined
                        return res.status(200).send({ hotel: hotel })
                    }
                } else {
                    res.status(404).send({ message: 'El usuario no se ha podido identificar.' })
                }
            })
        } else {
            return res.status(404).send({ message: 'El usuario no se ha podido logear' })
        }
    })
}

module.exports = {
    registrarHotel,
    login
}   