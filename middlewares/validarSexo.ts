import { Request, Response } from 'express';

//? Funcion para validar que el sexo de la mascota sea valido
const validarSexo = ( req:Request, res:Response, next:any ) => {
    
    const { sexo } = req.body; 

    if( !sexo ) {
        return res.status(401).json({
            msg: 'No se encuentra el sexo de la mascota en la peticion'
        })
    }
    
    if( sexo !== 'Macho' && sexo !== 'Hembra' ) {
        return res.status(401).json({
            msg: 'El sexo de la mascota no es valido'
        });
    }

    next();
    
}

export default validarSexo;
