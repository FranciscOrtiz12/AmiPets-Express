/* const dbValidators = require('./db-validators');
const generarJWT = require('./generar-jwt');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');

module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo,
} */

import generarJWT from "./generar-jwt";
import { existeEmailUser,
         existeUserById, 
         existeUser, 
         existeVetByRut,
         existeEmailVet  } from "./db-validators";

export {
    generarJWT,
    //! Validaciones Usuarios
    existeEmailUser, 
    existeUserById,
    existeUser,
    //! Validaciones Veterinarios
    existeVetByRut,
    existeEmailVet,
}
