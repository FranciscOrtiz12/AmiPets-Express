import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

import { Usuario } from "../models";

import { generarJWT } from '../helpers/index';

//! CONTROLADRES

//! POST
export const login = async ( req: Request, res: Response ) => {
    
    const { email, password } = req.body;

    try {
        
        //? Verificar si el email existe
        const usuario = await Usuario.findOne({ email });
        if( !usuario ) {
            return res.status(400).json({
                msg: 'Email / Password no son correctos'
            })
        }
        
        //? Si el usuario está activo
        if( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado'
            })
        }
        
        //? Verificar la contraseña - bcryptjs sirve para methodos de contraseñas encriptadas?
        // @ts-ignore
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if( !validPassword ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })

        }

        //? Generar el JWT
        const token = await generarJWT( usuario.id );


        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Algo salio mal, lo sentimos. :('
        })
    }

}
