const {response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const {generateJWT} = require('../helpers/jwt');

//Crear usuario
const createUser = async(req, res = response) => {

    //Leer datos del body
    const {email, password} = req.body;

    try {
        
        //Verificar si existe un usuario con el email
        let user = await User.findOne({email});
        
        //Si existe, retornar un error
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo'
            });
        }
        
        //Si no existe, crear un nuevo usuario
        user = new User(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        //Guardar usuario
        await user.save();

        //Generar JWT
        const token = await generateJWT(user.id, user.name);
        
        //Responder
        return res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });    

    //Si hay un error, retornarlo
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, por favor contacte al administrador'
        });
    }
};

//Login usuario
const userLogin = async(req, res = response) => {

    //Leer datos del body
    const {email, password} = req.body;

    try {

        //Verificar si existe un usuario con el email
        const user = await User.findOne({email});
        
        //Si no existe, retornar un error
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Verifique el Email'
            });
        }
        
        //Verificar contraseña
        const validPassword = bcrypt.compareSync(password, user.password);

        //Si la contraseña no es correcta, retornar un error
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        //Generar JWT
        const token = await generateJWT(user.id, user.name);

        //Responder
        return res.json({
            ok: true,
            uid:user.id,
            name: user.name,
            token
        });

    //Si hay un error, retornarlo
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, por favor contacte al administrador'
        });
    }
};

//Renovar token
const tokenRenew = async(req, res = response) => {

    //Leer datos del body
    const {uid, name} = req;

    //Generar JWT
    const token = await generateJWT(uid, name);

    //Responder
    return res.json({
        ok: true,
        token
    });
};

module.exports = {
    createUser,
    userLogin,
    tokenRenew
}