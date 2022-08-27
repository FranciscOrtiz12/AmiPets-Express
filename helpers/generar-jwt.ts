import jwt from 'jsonwebtoken';

const generarJWT = ( uid:String = '' ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = { uid };

        //? Crea un JWT( Json Web Token ) en base al id del usuario, y se firma con una variable de entorno 
        jwt.sign( payload, process.env.SECRETEORPRIVATEKEY!, {
            expiresIn: '10h'  //? expira al pasar 10horas
        }, ( err, token ) => {
            
            if( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }

        } );

    })
}

export default generarJWT;