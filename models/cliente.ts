import { Schema, model } from 'mongoose';

const ClienteSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellidos: {
        type: String,
        required: [true, 'El o los apellidos son obligatorios'],
    },
    rut: {
        type: String,
        required: [true, 'El rut es obligatorio'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    telefono: {
        type: String,
        required: [true, 'El telefono es obligatorio'],
    },
    direccion: {
        type: String,
        required: [true, 'La direccion es obligatoria'],
    },
    estado: {
        type: Boolean,
        default: true
    }
});


ClienteSchema.methods.toJSON = function() {
    const { __v, _id , ...cliente } = this.toObject();
    cliente.uid = _id;
    return cliente;
};


export default model( 'Cliente', ClienteSchema );