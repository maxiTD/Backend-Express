/* 
    Ruta Posts
    host + /api/data/posts 

    Ruta Imagenes
    host + /api/data/images 
*/

const {Router} = require('express');
const {validateJWT} = require('../middlewares/jwtValidate');
const {getPosts, getImages} = require('../controllers/data');

const router = Router();

//Ruta de posts
router.get('/posts', 
            //Validar el token
            validateJWT,
            getPosts);

//Ruta de imagenes
router.get('/images',
            //Validar el token
            validateJWT,
            getImages);

module.exports = router; 