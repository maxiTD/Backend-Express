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

router.get('/posts', validateJWT, getPosts);
router.get('/images', validateJWT , getImages);

module.exports = router; 