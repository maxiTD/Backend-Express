const {response} = require('express');
const Request = require('request');

//Obtener posts de la api
const getPosts = async(req, res = response) => {

    try {
        //Realizar peticion a la API
        Request.get("https://jsonplaceholder.typicode.com/posts", (error, response, body) => {

            //Si hay un error, mostrarlo en consola    
            if (error) {
                console.log(error);
            }

            //Leer el body de la respuesta
            let data = JSON.parse(body);

            //Devolver la respuesta
            return res.json({
                ok: true,
                data: data
            });
        });
    //Si hay un error, retornarlo
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            ok: false,
            message: 'Error al obtener posts'
        })
    }
};

//Obtener imagenes de la api
const getImages = async(req, res = response) => {

    //Leer iformacion de la peticion
    const {pageNumber, pageSize} = req.query;

    try {
        //Si pageNumber no existe, asignarle 1
        const page = !pageNumber ? 1 : pageNumber;
        //Si pageSize no existe, asignarle 10
        const size = !pageSize ? 10 : pageSize;
        //Calcular el offset
        const offset = page * size;
        //Calcular el limite
        const limit = Number(offset) + Number(size);
        
        //Realizar peticion a la API
        Request.get("https://jsonplaceholder.typicode.com/photos", (error, response, body) => {

            //Si hay un error, mostrarlo en consola
            if (error) {
                console.log(error);
            }

            //Leer el body de la respuesta
            let data = JSON.parse(body);

            //Devolver la respuesta
            return res.json({
                ok: true,
                page: pageNumber,
                totalPages: Math.ceil(data.length / size),
                pageSize: size,
                data: data.slice((offset - size), (limit - size)),
            });
        });
    //Si hay un error, retornarlo
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            ok: false,
            message: 'Error al obtener imagenes'
        })
    }
};

module.exports = {
    getPosts,
    getImages
}