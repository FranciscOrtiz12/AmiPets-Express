import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { Usuario } from "../models";

//! Funcion que valida que venga un token en la peticion del usuario
const validarJWT = async ( req:any , res:any, next:any ) => {

    const token = req.header('x-token');

    //? Validando que tengamos un token
    if( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    } 

    try {
        
        // //? se verifica que sea un token valido - y que este firmado con nuestra llave privada
        const payload:any = jwt.verify( token, process.env.SECRETEORPRIVATEKEY! );
        req.params.uid = payload.uid;


        // //? leer el usuario que corresponde al uid
        const usuario = await Usuario.findById( payload.uid );

        if( !usuario ){
            return res.status(401).json({
                msg: 'Token no valido - Usuario no existe en los registros'
            })
        }

        // //? Verificar si el uid tiene estado en true
        if( !usuario.estado ){
        return res.status(401).json({
                msg: 'Token no valido - Usuario con estado inactivo'
            })
        }
        
        // //? Le agregamos una propiedad al request
        req.usuario = usuario;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }


    

}

export default validarJWT;