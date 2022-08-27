import { validationResult } from 'express-validator';
import { Request, Response } from 'express';


//? Fncion que valida que todos los middlewares pasen correctamente
const validarCampos = ( req:Request, res:Response, next:any ) => {

    const errors = validationResult(req); //? Tomando los errores desde express-validator
    if( !errors.isEmpty() ){  //? Si tenemos errores, frenamos la ejecucion y mandamos una respuesta con los errores encontrados
        return res.status(400).json(errors); 
    }

    next();
    
}

export default validarCampos;