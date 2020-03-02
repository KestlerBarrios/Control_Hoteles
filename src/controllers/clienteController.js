'use strict'

const Cliente = require('../models/Cliente')

function editarCliente(req, res) {
    const clienteId = req.params.clienteId
    const params = req.body

    if (clienteId != req.cliente.sub) {
        return res.status(500).send({ message: 'No posee los permisos para actualizar el cliente' })
    }
    Cliente.findByIdAndUpdate(clienteId, params, {new: true},(err, clienteActualizado)=>{
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if(!clienteActualizado) return res.status(404).send({message: 'No se ha podido editar el Cliente'})
        return res.status(200).send({cliente: clienteActualizado})
    })


}

function eliminarClientes(req, res) {
    const clienteId = req.params.id
    if (clienteId != req.cliente.sub) {
        return res.status(500).send({ message: 'No posee los permisos para eliminar el Cliente' })
    }
    Cliente.findByIdAndDelete(clienteId, (err, clienteEliminado) => {
        if (err) return res.status(500).send({message: 'Error en la peticion'})
        return res.status(200).send({message:'Cliente Eliminado', clienteDeleted: clienteEliminado})
    })
}

function listarClientes(req, res) {
    Cliente.find().exec((err, clientes)=>{
        if(err) return res.status(500).send({message: 'Error en la petcion'})
        if (!clientes) return res.status(404).send({ message: 'Error al listar los Clientes' })
        return res.status(200).send({listadoHoteles: clientes})
    
    })
}

module.exports = {
    editarCliente,
    eliminarClientes,
    listarClientes
}