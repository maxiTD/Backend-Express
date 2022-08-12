/* 
    Rutas de usuarios - Auth
    host + /api/auth 
*/

const {Router} = require('express');
const {check} = require('express-validator');
const {createUser, userLogin, tokenRenew} = require('../controllers/auth');
const {fieldsValidate} = require('../middlewares/fieldValidators');
const {validateJWT} = require('../middlewares/jwtValidate');

const router = Router();

//Ruta de registro de usuarios
router.post('/new',
            [//middlewares
                //Validar que los campos esten completos
                check('name', 'El nombre es obligatorio').not().isEmpty(),
                check('email', 'El email es obligatorio').not().isEmpty(),
                //Validar que el email sea un email valido
                check('email', 'Revise el email ingresado').isEmail(),
                //Validar que el password tenga al menos 6 caracteres
                check('password', 'El password debe tener al menos 6 caracteres').isLength({min:6}),
                //Comprobar y retornar los errores (en caso de haber alguno)
                fieldsValidate
            ],
            createUser);

//Ruta de login de usuarios
router.post('/',
            [//middlewares
                //Validar que los campos esten completos
                check('email', 'El email es obligatorio').not().isEmpty(),
                //Validar que el email sea un email valido
                check('email', 'Revise el email ingresado').isEmail(),
                //Validar que el password tenga al menos 6 caracteres
                check('password', 'El password debe tener al menos 6 caracteres').isLength({min:6}),
                //Comprobar y retornar los errores (en caso de haber alguno)
                fieldsValidate
            ],
            userLogin);

//Ruta de renovacion de token
router.get('/renew',
            //Validar el token
            validateJWT,
            tokenRenew);

module.exports = router; 