import { Router } from 'express';
import { check } from 'express-validator';

// import { existeEmail, existeUser, existeUserById } from '../helpers/db-validators';

import { existeEmailUser, existeUser, existeUserById } from '../helpers/index';

import { getUsuarios, putUsuario, postUsuario, deleteUsuario } from '../controllers/usuariosController';

import { validarCampos,
         validarJWT } from '../middlewares/index';


const router = Router();

//! Obtener todos los usuarios
router.get('/', [
    validarJWT,
], getUsuarios);

//! Agregar un Usuario
router.post('/', [
    validarJWT,
    check('userName', 'El userName es requerido').notEmpty(),
    check('userName').custom( userName => existeUser( userName ) ),
    check('nombre', 'El nombre es requerido').notEmpty(),
    check('apellido', 'El apellido es requerido').notEmpty(),
    check('telefono', 'El telefono debe tener 9 digitos como minimo').isLength({ min: 9 }),
    check('email', 'El email no parece ser valido').isEmail(),
    check('email').custom( email => existeEmailUser( email ) ),
    check('password', 'El password debe contener 6 caracteres o más').isLength({ min: 6 }),
    validarCampos
],   postUsuario);

//! Actualizar un Usuario
router.put('/:id', [
    validarJWT,
    check('id', 'El ID no es válido').isMongoId(),
    check('id').custom( id => existeUserById( id ) ),
    validarCampos
], putUsuario);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( id => existeUserById(id) ),
    validarCampos
], deleteUsuario);


export default router;