import { validationResult } from 'express-validator';
import { Request, Response } from 'express';

const validarCampos = ( req:Request, res:Response, next:any ) => {

    const errors = validationResult(req); //? Tomando los errores desde express-validator
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    next();
    
}

export default validarCampos;