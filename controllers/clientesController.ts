import { Request, Response } from "express";

import { Cliente } from "../models/index"


//! CONTROLADRES

//! GET
export const getClientes = async ( req: Request, res: Response ) => {

    const estado = { estado:true };
    // @ts-ignore
    const usuarioAutenticado = req.usuario;

    try {

        const [ total, clientes ] = await Promise.all([
            Cliente.countDocuments( estado ),
            Cliente.find( estado ),
        ]);

        res.status(200).json({
            total,
            clientes,
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
export const postClientes = async ( req: Request, res: Response ) => {

    const { nombre, apellidos, rut, email, telefono, direccion } = req.body;
    // @ts-ignore
    const usuarioAutenticado = req.usuario;

    try {

        const cliente = new Cliente({ nombre, apellidos, rut, email, telefono, direccion });

        await cliente.save();

        res.status(200).json({
            msg: 'Cliente creado correctamente',
            cliente,
            'Peticion realizada por: ': usuarioAutenticado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en catch, informe al administrador'
        })
    }
    
}


//! PUT 
export const putClientes = async ( req: Request, res: Response ) => {
    const { estado, rut, ...data  } = req.body;
    // @ts-ignore
    const usuarioAutenticado = req.usuario;

    const query = { rut };

    try {

        const cliente = await Cliente.findOneAndUpdate( query, data, { new: true } )

        res.status(200).json({
            msg: 'Cliente actualizado correctamente',
            cliente,
            'Peticion realizaeda por: ': usuarioAutenticado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en catch, informe al administrador'
        })
    }

    
    
}


//! DELETE
export const deleteClientes = async ( req: Request, res: Response ) => {

    const { rut } = req.body;

    
    // @ts-ignore
    const usuarioAutenticado = req.usuario;

    try {

        const cliente = await Cliente.findOneAndUpdate( { rut }, {estado: false } );

        res.status(200).json({
            msg: 'Cliente eliminado correctamente',
            cliente,
            'Peticion realizada por: ': usuarioAutenticado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en catch, informe al administrador'
        });
    }
    
}