import { Router } from 'express';
import { check } from 'express-validator';

import { getClientes,
         putClientes,
         deleteClientes,
         postClientes } from '../controllers/clientesController';

import { existeCliByRut,
         existeEmailCli} from '../helpers/db-validators';

import { validarCampos,
         validarJWT } from '../middlewares/index';


const router = Router();

router.get('/', [
    validarJWT
], getClientes);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es Obligatorio').notEmpty(),
    check('apellidos', 'El o los apellidos son obligatorios').notEmpty(),
    check('rut', 'El rut es obligatorio').notEmpty(),
    check('rut').custom( rut => existeCliByRut( rut ) ),
    check('email', 'El email es obligatorio').notEmpty(),
    check('email', 'El email no parece ser valido').isEmail(),
    check('email').custom( email => existeEmailCli( email ) ),
    check('telefono', 'El telefono debe tener 9 digitos como minimo').isLength({ min: 9 }),
    validarCampos
], postClientes);

router.put('/', [
    validarJWT,
    check('rut', 'El rut es obligatorio').notEmpty(),
    check('rut').custom( rut => existeCliByRut( rut, true ) ),
    validarCampos
], putClientes);

router.delete('/', [
    validarJWT,
    check('rut', 'El rut es obligatorio').notEmpty(),
    check('rut').custom( rut => existeCliByRut( rut, true ) ),
    validarCampos
], deleteClientes);



export default router;