import { Schema, model } from 'mongoose';

const MascotaSchema = new Schema({
     //Falta la relacion
    nombre: { 
        type: String,
        required: [ true, 'El nombre de la mascota es obligatorio' ]
    },
    color: {
        type: String,
        required: [ true, 'El color de la mascota es obligatorio' ]
    },
    sexo: {
        type: String,
        required: [ true, 'El color de la mascota es obligatorio' ]
    },
    tipo: {
        type: String,
        required: [true, 'El tipo de mascota es obligatorio']
    },
    size: {
        type: String,
        required: [true, 'El tamaño de la mascota es obligatorio']
    },
    edad: {
        type: String,
        default: 'Sin Determinar'
    },
    idDue: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true,
    },
    estado: {
        type: Boolean,
        default: true
    },
});


MascotaSchema.methods.toJSON = function() {
    const { __v, _id , ...mascota } = this.toObject();
    mascota.uid = _id;
    return mascota;
};


export default model( 'Mascota', MascotaSchema );