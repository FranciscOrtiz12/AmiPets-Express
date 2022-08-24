import { Schema, model } from 'mongoose';

const UsuarioSchema = new Schema({
    userName: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio'],
        unique: true
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    telefono: {
        type: String,
        required: [true, 'El telefono es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El contraseña es obligatoria'],
    },
    estado: {
        type: Boolean,
        default: true
    },
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id , ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}


export default model( 'Usuario', UsuarioSchema );