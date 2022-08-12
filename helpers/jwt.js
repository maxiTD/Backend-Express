const jwt = require('jsonwebtoken');

//Generar JWT
const generateJWT = (uid, name) => {
    
    return new Promise((resolve,  reject) => {

        //Generar payload
        const payload = {uid, name};

        //Firmar el JWT
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {

            //Si hay un error, rechazar la promesa
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            }

            //Si no hay error, resolver la promesa
            resolve(token);
        });
    });
};

module.exports = {
    generateJWT
}