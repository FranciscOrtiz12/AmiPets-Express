import { Router } from 'express';
import { check } from 'express-validator';

import { getVeterinarios,
         postVeterinarios,
         putVeterinarios,
         deleteVeterinarios } from '../controllers/veterinariosController';

import { existeVetByRut,
         existeEmailVet, 
         existeUserById} from '../helpers/db-validators';

import { validarCampos,
         validarJWT } from '../middlewares/index';


const router = Router();

router.get('/', [
    validarJWT,
], getVeterinarios);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('apellidos', 'El o los apellidos son obligatorios').notEmpty(),
    check('rut', 'El rut es obligatorio').notEmpty(),
    check('rut').custom( rut => existeVetByRut( rut ) ),
    check('especialidad', 'La especialidad es obligatoria').notEmpty(),
    check('email', 'El email es obligatorio').notEmpty(),
    check('email', 'El email no parece ser valido').isEmail(),
    check('email').custom( email => existeEmailVet( email ) ),
    check('telefono', 'El telefono debe tener 9 digitos como minimo').isLength({ min: 9 }),
    validarCampos
], postVeterinarios);

router.put('/', [
    validarJWT,
    check('rut', 'El rut es obligatorio').notEmpty(),
    check('rut').custom( rut => existeVetByRut( rut, true ) ),
    validarCampos
], putVeterinarios);

router.delete('/', [
    validarJWT,
    check('rut', 'El rut es obligatorio').notEmpty(),
    check('rut').custom( rut => existeVetByRut( rut, true ) ),
    validarCampos
], deleteVeterinarios);



export default router;