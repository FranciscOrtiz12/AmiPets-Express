import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

import { Usuario } from "../models/index"

//! CONTROLADRES

//! GET
export const getUsuarios = async ( req: Request|any, res: Response ) => {

    const estado = { estado: true };
    const usuarioAutenticado = req.usuario;

    try {

        const [ total, usuarios] = await Promise.all([
            Usuario.countDocuments( estado ),
            Usuario.find( estado )
        ]);
    
        res.status(200).json({
            msg: 'Get Usuarios',
            total,
            usuarios,
            'Peticion realizada por: ': usuarioAutenticado 
        })
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Error en catch, informe al Administrador'
        })

    }


}

//! POST
export const postUsuario = async ( req: Request|any, res: Response ) => {

    const { userName, nombre, apellido, telefono, email, password } = req.body;
    const usuarioAutenticado = req.usuario;
    

    try {
        const usuario = new Usuario({userName, nombre, apellido, telefono, email, password });
    
        // Encriptar el password
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync( password, salt );

        // Definir username
        usuario._id = userName;
    
        // Guardar en BD
        await usuario.save();

        res.status(200).json({
            msg: 'Usuario creado correctamente',
            usuario,
            'Peticion realizada por: ': usuarioAutenticado
        })
        
    } catch (error) {
        console.log(error);
        console.log('Error en catch, informe al Administrador');
    }


}

//! PUT
export const putUsuario = async ( req: Request|any, res: Response ) => {

    const { id } = req.params;
    const { _id, password, ...resto } = req.body;
    const usuarioAutenticado = req.usuario;

    try {
        
        if( password ) {
            // Encriptar el password
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync( password, salt );
    
        }
    
        //? Se actualiza en base al id y el resto son los parametros actualizados
        const usuario = await Usuario.findByIdAndUpdate( id, resto );
    
        res.status(200).json({
            msg: 'Usuario actualizado correctamente',
            usuario,
            'Peticion realizada por: ': usuarioAutenticado
        })

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
           msg: 'Error en catch, Informe al Administrador' 
        });

    }


}

//! DELETE
export const deleteUsuario = async ( req: Request|any, res: Response ) => {
    
    const { id } = req.params;
    const usuarioAutenticado = req.usuario;


    try {
        //! BORRADO LOGICO
        const usuario = await Usuario.findByIdAndUpdate( id, { estado: false });
    
        res.status(200).json({
            msg: 'Usuario eliminado correctamente',
            usuario,
            'Peticion realizada por: ': usuarioAutenticado
            
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en catch, Informe al Administrador',
        })
    }

}