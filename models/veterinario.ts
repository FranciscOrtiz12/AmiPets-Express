import { Schema, model } from 'mongoose';


const VeterinarioSchema = new Schema({
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
    especialidad: {
        type: String,
        required: [true, 'La especialidad es obligatoria']
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
    estado: {
        type: Boolean,
        default: true
    }
});


VeterinarioSchema.methods.toJSON = function() {
    const { __v, _id , ...veterinario } = this.toObject();
    veterinario.uid = _id;
    return veterinario;
};


export default model( 'Veterinario', VeterinarioSchema );