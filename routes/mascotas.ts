import { Router } from 'express';
import { check } from 'express-validator';

import { getMascotas,
         postMascotas,
         deleteMascotas,
         putMascotas } from '../controllers/mascotasController';

import { existeDue,
         tiposPermitidos,
         existeMasById } from '../helpers/db-validators';

import { validarCampos,
         validarJWT,
         validarSexo } from '../middlewares/index';


const router = Router();

//! Obtener todos los usuarios
router.get('/', [
    validarJWT
], getMascotas);

//! Agregar un Usuario
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatoria').not().isEmpty(),
    check('color', 'El color es obligatorio').not().isEmpty(),
    check('sexo', 'El sexo es obligatorio').not().isEmpty(),
    // check('sexo').custom( sexo => validarSexo( sexo ) ),
    validarSexo,
    check('tipo', 'El tipo de es obligatorio').not().isEmpty(),
    check('tipo').custom( tipo => ( tiposPermitidos( tipo, ['Perro','Gato','Caballo','Tortuga'] ) ) ),
    check('size', 'El tamaño de la mascota es obligatorio').not().isEmpty(),
    check('rutDue', 'El dueño de la mascota es obligatorio').not().isEmpty(),
    check('rutDue').custom( rutDue => existeDue( rutDue, )),
    validarCampos
],   postMascotas);

//! Actualizar un Usuario
router.put('/', [
    validarJWT,
    check('id','El id de la mascota es obligatorio').not().isEmpty(),
    check('id').custom( id => existeMasById( id, true ) ),
    validarCampos,
], putMascotas);

router.delete('/', [
    validarJWT,
    check('id', 'El id de la mascota es obligatorio').notEmpty(),
    check('id', 'El id de mongo no es valido').isMongoId(),
    check('id').custom( id => existeMasById(id) ),
    validarCampos
], deleteMascotas);


export default router;