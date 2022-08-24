import { Request, Response } from "express";
import { selectFields } from "express-validator/src/select-fields";

import { Mascota, Cliente } from "../models/index"


//! CONTROLADRES

//! GET
export const getMascotas = async ( req: Request, res: Response ) => {

    const estado = { estado:true };
    // @ts-ignore
    const usuarioAutenticado = req.usuario;

    try {

        const [ total, mascotas ] = await Promise.all([
            Mascota.countDocuments( estado ),
            Mascota.find( estado )
                .populate('idDue', ['nombre','apellidos']),
        ]);

        res.status(200).json({
            total,
            mascotas,
            'Peticion realizada por: ': usuarioAutenticado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en catch, informe la Administrador'
        })
    }
}


//! POST
export const postMascotas = async ( req: Request, res: Response ) => {


    const { nombre, color, sexo, tipo, size, rutDue } = req.body;
    // @ts-ignore
    const usuarioAutenticado = req.usuario;

    try {
        // Buscamos el cliente en base a su rut
        const cliente = await Cliente.findOne( { rut: rutDue } );
        const idCliente = cliente!._id;

        // Creamos la mascota con los datos recibidos
        const mascota = new Mascota({ nombre, color, sexo, tipo, size, idDue: idCliente })
    
        // guardamos en DB
        await mascota.save();

        res.status(200).json({
            msg: 'Mascota creada correctamente',
            mascota: mascota,
            'Peticion realizada por ': usuarioAutenticado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en catch, informe al administrador'
        })
    }
    
}


//! PUT 
export const putMascotas = async ( req: Request, res: Response ) => {
    
    const { estado, id, ...data  } = req.body;
    // @ts-ignore
    const usuarioAutenticado = req.usuario;

    const query = { id };
    
    try {
        const mascota = await Mascota.findOneAndUpdate( query, data, { new: true } );

        res.status(200).json({
            msg: 'Mascota actualizada correctamente',
            mascota,
            'Peticion realizada por: ': usuarioAutenticado
        })
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en catch, informe al administrador'
        })
    }
    
    
}


//! DELETE

export const deleteMascotas = async ( req: Request, res: Response ) => {

    const { id } = req.body;

    // @ts-ignore
    const usuarioAutenticado = req.usuario;

    try {

        const mascota = await Mascota.findOneAndUpdate( { _id: id }, { estado: false} );

        res.status(200).json({
            msg: 'Mascota Eliminada correctamente',
            mascota,
            'Peticion realizada por: ': usuarioAutenticado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en catch, informe al administrador'
        })
    }


    res.status(200).json({
        msg: 'Delete - Mascotas'
    })
    
}