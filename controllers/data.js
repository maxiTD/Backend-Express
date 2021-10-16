const {response} = require('express');
const Request = require('request');


const getPosts = async(req, res = response) => {

    try {
        res.redirect('https://jsonplaceholder.typicode.com/posts');
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            ok: false,
            message: 'Error al obtener posts'
        })
    }
};

const getImages = async(req, res = response) => {

    try {

        const page = !req.body.page ? 0 : req.body.page;
        const pageSize = 10;
        const offset = page * pageSize;
        const limit = pageSize;

        Request.get("https://jsonplaceholder.typicode.com/photos", (error, response, body) => {

            if (error) {
                console.log(error);
            }

            let data = JSON.parse(body);

            return res.json({
                ok: true,
                data: data.slice(offset, offset+limit),
                totalPages: Math.ceil(body.length / limit)
            });
        });

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