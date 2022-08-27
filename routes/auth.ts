import { Router } from 'express';
import { check } from 'express-validator';

import { login } from '../controllers/authController';

import { validarCampos } from '../middlewares/index';


const router = Router();

//! Obtener todos los usuarios
router.post('/login', [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos
],login);


export default router;