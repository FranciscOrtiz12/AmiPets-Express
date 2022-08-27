import { Schema, model } from 'mongoose';

const ControlSchema = new Schema({

    idDue: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true,
    },
    idMas: {
        type: Schema.Types.ObjectId,
        ref: 'Mascota',
        required: true,
    },
    idVet: {
        type: Schema.Types.ObjectId,
        ref: 'Veterinario',
        required: true,
    },
    fecha: {
        type: String,
        required: [ true, 'La fecha del control es obligatoria' ]
    },
    hora: {
        type: String,
        required: [ true, 'La hora del control es obligatoria' ]
    },
    detalle: {
        type: String,
        default: ''
    },
    estado: {
        type: Boolean,
        default: true
    },
    
});


ControlSchema.methods.toJSON = function() {
    const { __v, _id , ...control } = this.toObject();
    control.uid = _id;
    return control;
};

export default model( 'Control', ControlSchema );