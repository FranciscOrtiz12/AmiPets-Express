import { Router } from 'express';
import { check } from 'express-validator';

import { validarJWT,
         validarCampos } from '../middlewares/index';

import { getControles,
         postControles, 
         putControles,
         deleteControles } from '../controllers/controlesController';

import { existeDue,
         existeMasById,
         existeVetControl,
         existeMasControl, 
         existeControl} from '../helpers/db-validators'


const router = Router();

router.get('/', [
    validarJWT
], getControles);

router.post('/', [
    validarJWT,
    check('rutCli','El rut del cliente es obligatorio'),
    check('rutCli').custom( rut => existeDue( rut ) ),
    check('rutVet','El rut del veterinario es obligatorio'),
    check('rutVet').custom( rut => existeVetControl( rut ) ),
    check('idMas','El id de la mascota es obligatorio'),
    check('idMas').custom( id => existeMasControl( id ) ),
    check('fecha','La fecha del control es obligatoria'),
    check('hora','La hora del control es obligatoria'),
    validarCampos
], postControles);

router.put('/', [
    validarJWT,
    check('id', 'El id del control es obligatorio').notEmpty(),
    check('id', 'El id de mongo no es valido').isMongoId(),
    check('id').custom( id => existeControl(id) ),
    validarCampos
], putControles);

router.delete('/', [
    validarJWT,
    check('id', 'El id del control es obligatorio').notEmpty(),
    check('id', 'El id de mongo no es valido').isMongoId(),
    check('id').custom( id => existeControl(id) ),
    validarCampos
], deleteControles);



export default router;