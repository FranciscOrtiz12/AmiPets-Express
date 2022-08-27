import express from 'express';

import authRoutes from '../routes/auth';
import userRoutes from '../routes/usuario';
import veterinariosRoutes from '../routes/veterinario';
import clientesRoutes from '../routes/cliente';
import mascotasRoutes from '../routes/mascotas';
import controlRoutes from '../routes/control';

import cors from "cors";

import dbConnection from './../db/conection';


class Server {

    private app: express.Application;
    private port: string;
    private apiPaths = {
        auth: '/api/auth',
        usuarios: '/api/usuarios',
        veterinarios: '/api/veterinarios',
        clientes: '/api/clientes',
        mascotas: '/api/mascotas',
        controles: '/api/controles',
    }


    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';

        //! Conectar a la BD
        this.conectarDB();

        //! Metodos Iniciales - Middlewares
        this.middlewares();
        this.routes(); // Definir mis rutas
    }


    async conectarDB(){
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura del body
        this.app.use( express.json() ); //? configuracion para indicar que leeremos el body como json

        // Carpeta Publica
        this.app.use( express.static('public') );

    }


    routes() {
        this.app.use( this.apiPaths.usuarios, userRoutes );
        this.app.use( this.apiPaths.auth, authRoutes );
        this.app.use( this.apiPaths.veterinarios, veterinariosRoutes );
        this.app.use( this.apiPaths.clientes, clientesRoutes );
        this.app.use( this.apiPaths.mascotas, mascotasRoutes );
        this.app.use( this.apiPaths.controles, controlRoutes );
    }


    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port );
        })
    }

}

export default Server;