'use strict'


const Hotel = require("../models/Hotel")

function editarHotel(req, res) {
    const hotelId = req.params.hotelId
    const params = req.body

    if (hotelId != req.hotel.sub) {
        return res.status(500).send({ message: 'No posee los permisos para actualizar el Hotel' })
    }
    Hotel.findByIdAndUpdate(hotelId, params, { new: true }, (err, hotelActualizado) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (!hotelActualizado) return res.status(404).send({ message: 'No se ha podido editar el Hotel' })
        return res.status(200).send({ hotel: hotelActualizado })
    })
}

function eliminarHotel(req, res) {
    const hotelId = req.params.id
    if (hotelId != req.hotel.sub) {
        return res.status(500).send({ message: 'No posee los permisos para eliminar el Hotel' })
    }
    Hotel.findByIdAndDelete(hotelId, (err, hotelEliminado) => {
        if (err) return res.status(500).send({message: 'Error en la peticion'})
        return res.status(200).send({message:'Hotel Eliminado', hotelDeleted: hotelEliminado})
    })

}

function listarHoteles(req, res) {
Hotel.find().exec((err, hoteles)=>{
    if(err) return res.status(500).send({message: 'Error en la petcion'})
    if (!hoteles) return res.status(404).send({ message: 'Error al listar los Hoteles' })
    return res.status(200).send({listadoHoteles: hoteles})

})
}

module.exports = {
    editarHotel,
    eliminarHotel,
    listarHoteles
}   