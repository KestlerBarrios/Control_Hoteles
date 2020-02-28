'use strict'
const bcrypt = require('bcrypt-nodejs')
const jwt = require('../services/jwt')

const Hotel = require('../models/Hotel')
const Cliente = require('../models/Cliente')

function registrarHotel(req, res) {
    var hotel = new Hotel()
    var params = req.body

    if (params.nombre && params.password && params.email) {
        hotel.nombre = params.nombre
        hotel.usuario = params.usuario
        hotel.email = params.email
        hotel.rol = "ROLE_ADMIN"
        Hotel.find({ $or: [{ usuario: hotel.usuario }, { email: hotel.email }] }).exec((err, hoteles) => {
            if (err) return res.status(500).send({ message: 'Error en la peticion.' })
            if (hoteles && hoteles.length >= 1) {
                return res.status(500).send({ message: 'El Hotel ya existe.' })
            } else {
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    hotel.password = hash
                    hotel.save((err, hotelGuardado) => {
                        if (err) return res.status(500).send({ message: 'Error al guardar el Hotel.' })
                        if (hotelGuardado) {
                            res.status(200).send({ hotel: hotelGuardado })
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

function registrarCliente(req, res) {
    var cliente = new Cliente()
    var params = req.body

    if (params.nombre && params.password && params.email) {
        cliente.nombre = params.nombre
        cliente.usuario = params.usuario
        cliente.email = params.email
        cliente.rol = "ROLE_CLIENTE"
        Cliente.find({ $or: [{ usuario: cliente.usuario }, { email: cliente.email }] }).exec((err, clientes) => {
            if (err) return res.status(500).send({ message: 'Error en la peticion.' })
            if (clientes && clientes.length >= 1) {
                return res.status(500).send({ message: 'El Cliente ya existe.' })
            } else {
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    cliente.password = hash
                    cliente.save((err, clienteGuardado) => {
                        if (err) return res.status(500).send({ message: 'Error al guardar el Cliente.' })
                        if (clienteGuardado) {
                            res.status(200).send({ hotel: clienteGuardado })
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
            Cliente.findOne({ email: params.email }, (err, cliente) => {
                if (err) return res.status(500).send({ message: 'Error en la peticion' })
                if (cliente) {
                    bcrypt.compare(params.password, cliente.password, (err, check) => {
                        if (check) {
                            if (params.gettoken) {
                                return res.status(200).send({ token: jwt.createToken(cliente) })
                            } else {
                                cliente.password = undefined
                                return res.status(200).send({ cliente: cliente })
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
    })
}

module.exports = {
    registrarHotel,
    registrarCliente,
    login
}