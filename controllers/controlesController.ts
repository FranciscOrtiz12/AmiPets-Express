import { Request, Response } from "express";

import { Mascota, Cliente, Veterinario, Control  } from "../models/index"

//! CONTROLADRES

//! GET
export const getControles = async ( req: Request, res: Response ) => {

    const estado = { estado:true };
    // @ts-ignore
    const usuarioAutenticado = req.usuario;

    try {

        const [ total, controles ] = await Promise.all([
            Control.countDocuments( estado ),
            Control.find( estado )
                    .populate('idDue', ['nombre','apellidos'])
                    .populate('idMas', ['nombre'])
                    .populate('idVet', ['nombre','apellidos'])
        ]);

        res.status(200).json({
            total,
            controles,
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
export const postControles = async ( req: Request, res: Response ) => {

    const { rutCli, rutVet, idMas, fecha, hora, detalle } = req.body;
    // @ts-ignore
    const usuarioAutenticado = req.usuario;

    try {
        //? Mapeamos los ids del cliente y el veterinario en base a su rut
        // Buscamos el cliente en base a su rut
        const cliente = await Cliente.findOne( { rut: rutCli } );
        const idCliente = cliente!._id;
        
        // Buscamos al Veterinario en base a su rut
        const veterinario = await Veterinario.findOne( { rut: rutVet } );
        const idVeterinario = veterinario!._id;

        // Creamos la mascota con los datos recibidos
        const control = new Control({ idDue: idCliente, idMas, idVet: idVeterinario, fecha, hora, detalle })
    
        //? Guardamos en DB
        await control.save();

        //? Enviamos la response
        res.status(200).json({
            msg: ' control creado correctamente',
             control:  control,
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
export const putControles = async ( req: Request, res: Response ) => {

    console.log('entramos al put');
    
    const { estado, id, ...data  } = req.body;
    // @ts-ignore
    const usuarioAutenticado = req.usuario;

    const query = { _id: id };
    console.log(query);
    
    try {
        const control = await Control.findOneAndUpdate( query, data, { new: true } );

        res.status(200).json({
            msg: 'Control actualizado correctamente',
            control,
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
export const deleteControles = async ( req: Request, res: Response ) => {

    const { id } = req.body;
    // @ts-ignore
    const usuarioAutenticado = req.usuario;

    try {

        const control = await Control.findOneAndUpdate( { _id: id }, { estado: false} );

        res.status(200).json({
            msg: 'Control eliminado correctamente',
            control,
            'Peticion realizada por: ': usuarioAutenticado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en catch, informe al administrador'
        })
    }

}




/* 
    ESTO SE DEBE ELIMINAR DE MANERA INMEDIATA

    Estimada Carolina López,
 
    Gracias por la oferta para ocupar el cargo de Analista Programador en Advise. Estoy feliz de aceptar formalmente la oferta.
    Puedo confirmar que mi fecha de inicio será el 29 de agosto del 2022. Si hay alguna información adicional que necesite antes de esta fecha, por favor hágamelo saber.

    Desde ya, muchas gracias por la oportunidad.

    Saludos cordiales,
    Francisco Ortiz
*/