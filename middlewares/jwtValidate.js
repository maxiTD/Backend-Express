const {response} = require('express');
const jwt = require('jsonwebtoken');

//Validar JWT
const validateJWT = (req, res = response, next) => {

    //Leer el token (x-token header)
    const token = req.header('x-token');

    //Si no se recibe un token, retornar un error
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no encontrado'
        });
    };

    try {
        
        //Verificar el token
        const {uid, name} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        //Asignar el uid y name al request para usarlos en las rutas
        req.uid = uid;
        req.name = name;
    
    //Si hay un error, retornarlo
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }

    //Continuar con la ejecucion de la ruta
    next();
};

module.exports = {
    validateJWT
};