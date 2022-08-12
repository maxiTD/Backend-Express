const {validationResult} = require('express-validator');

const fieldsValidate = (req, res, next) => {

    //Obteber los errores de las validaciones anteriores
    const errors = validationResult(req);
    //Si hay errores, se retorna un error 400 con la lista de errores
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }
    //Si no hay errores, se continua con el proceso
    next();
};

module.exports = {
    fieldsValidate
}