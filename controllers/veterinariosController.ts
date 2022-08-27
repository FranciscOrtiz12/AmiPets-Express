import { Request, Response } from "express";

import { Veterinario } from "../models/index"

//! CONTROLADRES

//! GET
export const getVeterinarios = async ( req: Request|any, res: Response ) => {

    const estado = { estado: true };
    const usuarioAutenticado = req.usuario;

    try {
        
        const [ total, veterinarios ] = await Promise.all([
            Veterinario.countDocuments( estado ),
            Veterinario.find( estado ),
        ]);
        
        res.status(200).json({
            total,
            veterinarios,
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
export const postVeterinarios = async ( req: Request|any, res: Response ) => {

    const { nombre, apellidos, rut, especialidad, email, telefono } = req.body;
    const usuarioAutenticado = req.usuario;

    try {

        const veterinario = new Veterinario({ nombre, apellidos, rut, especialidad, email, telefono });

        await veterinario.save();

        res.status(200).json({
            msg: 'Veterinario creado correctamente',
            veterinario,
            'Peticion realizada por: ': usuarioAutenticado
        })

        
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            msg: 'Error en catch, informe al administrador'
        })

    }

}

//! PUT
export const putVeterinarios = async ( req: Request|any, res: Response ) => {

    const { estado, rut, ...data  } = req.body;
    const usuarioAutenticado = req.usuario;

    const query = { rut };
    
    try {

        const veterinario = await Veterinario.findOneAndUpdate( query, data, { new: true } );

        res.status(200).json({
            msg: 'Veterinario actualizado correctamente',
            veterinario,
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
export const deleteVeterinarios = async ( req: Request|any, res: Response ) => {

    const { rut } = req.body;
    const usuarioAutenticado = req.usuario;

    const query = { rut }

    try {
        
        const veterinario = await Veterinario.findOneAndUpdate( query, { estado: false });

        res.status(200).json({
            msg: 'Veterinario eliminado correctamente',
            veterinario,
            'Peticion realizada por: ': usuarioAutenticado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en catch, informe al administrador'
        });

    }


}
