import mongoose from 'mongoose';


//? Conexion a la DB
const dbConnection = async () => {

    try {
        await mongoose.connect( process.env.MONGODB_CNN! );
    } catch (error) {
        console.log(error);
        throw new Error('Error al momento de conectar con la BD');
    }

}

export default dbConnection;