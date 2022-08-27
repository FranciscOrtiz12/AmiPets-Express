import { Usuario, Veterinario, Cliente, Mascota, Control } from "../models/index";

//! VALIDACIONES DE USUARIOS

//? Validar si existe un email determinado en la tabla de Usuarios
const existeEmailUser = async ( email:string = '' ) => {
    
    const existeEmailUser = await Usuario.findOne( { email } );
    if( existeEmailUser ) {
        throw new Error('El Email ya se encuentra registrado');
    }
};


//? Validar si existe un usuario determinado en la tabla de Usuarios
const existeUser = async ( userName:string = '' ) => {
    
    const existeUser = await Usuario.findOne( { userName } );
    if( existeUser ) {
        throw new Error('El nombre de usuario ya se encuentra registrado');
    }
};


//? Validar si existe un usuario determinado en la tabla de Usuarios
const existeUserById = async ( id:string = '' ) => {
    
    const existeUser = await Usuario.findById(id);
    if( !existeUser ) {
        throw new Error(`El id: ${ id }, no se encuentra en la base de datos`);
    }
};



//! VALIDACIONES DE VETERINARIOS

//? Validar si existe un rut determinado en la tabla de Veterinarios
const existeVetByRut = async ( rut:string = '', toUpdate:boolean = false ) => {

    const existeVet = await Veterinario.findOne( { rut } );
    if( existeVet ){
        if( !toUpdate ) throw new Error(`El rut ya se encuentra ingresado en la Base de Datos`);
    }

};


//? Validar si existe un email determinado en la tabla de Veterinarios
const existeEmailVet = async ( email:string = '' ) => {
    
    const existeEmailVet = await Veterinario.findOne( { email } );
    if( existeEmailVet ) {
        throw new Error('El Email ya se encuentra registrado');
    }
};


//! VALIDACIONES DE CLIENTES

//? Validar si existe un email determinado en la tabla de Clientes
const existeEmailCli = async ( email:string = '' ) => {
    
    const existeEmailCli = await Cliente.findOne( { email } );
    if( existeEmailCli ) {
        throw new Error('El Email ya se encuentra registrado');
    }
};


//? Validar si existe un rut determinado en la tabla de Veterinarios
const existeCliByRut = async ( rut:string = '', toUpdate:boolean = false ) => {

    const existeCli = await Cliente.findOne( { rut } );
    if( existeCli ){
        if( !toUpdate ) throw new Error(`El rut ya se encuentra ingresado en la Base de Datos`);
    }

};


//! VALIDACIONES DE MASCOTAS

//? Valida si el tipo de mascota es permitido o no
const tiposPermitidos = ( tipo:String = '', tipos: String[] = [] ) => {

    // @ts-ignore
    const isInclude = tipos.includes( tipo );

    if( !isInclude ){
        throw new Error(`La colección ${ tipo } no es permitida, ${ tipos }`);
    }

    return true;
}


//? Validar si existe un rut determinado en la tabla de Clientes
const existeDue = async ( rut:string = '' ) => {

    const existeCli = await Cliente.findOne( { rut, estado: true } );
    if( !existeCli ){
        throw new Error(`No hay un cliente registrado con el rut: ${ rut }`);
    }
};


//? Validar si existe una mascota por su id
const existeMasById = async ( id:string = '', isToUpdate:boolean = false ) => {

    const existeMas = await Mascota.findOne( { id, estado: true } );
    if( existeMas ){
        if( !isToUpdate ) throw new Error(`No hay una mascota registrada con el id: ${ id }`);
    }

};


//! VALIDACIONES DE CONTROLES

//? verificar si existe un veterinario
const existeVetControl = async ( rut:string = '' ) => {

    const existeVet = await Veterinario.findOne( { rut, estado: true } );
    if( !existeVet ){
        throw new Error(`No hay un Veterinario registrado con el rut: ${ rut }`);
    }
};

//? verificar si existe una mascota determinada
const existeMasControl = async ( _id:string = '' ) => {
    const existeMas = await Mascota.findById( { _id , estado: true } );
    if( !existeMas ){
        throw new Error(`No hay una Mascota registrada con el id: ${ _id }`);
    }
};

const existeControl = async ( id:string = '' ) => {

    const existeControl = await Control.findOne( { _id: id, estado: true } );
    if( !existeControl ) {
        throw new Error(`No hay un Control registrado con el id: ${ id }`);
    }
}



export {
    //! Validaciones Usuarios
    existeEmailUser,
    existeUser,
    existeUserById,
    //! Validaciones Veterinarios
    existeVetByRut,
    existeEmailVet,
    //! Validaciones Clientes
    existeEmailCli,
    existeCliByRut,
    //! Validaciones Mascotas
    tiposPermitidos,
    existeDue,
    existeMasById,
    //! Validaciones Controles
    existeControl,
    existeVetControl,
    existeMasControl,

    
}