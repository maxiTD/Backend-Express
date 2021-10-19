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

    //necesito recibir el pageSize (del front)
    const {pageNumber, pageSize} = req.query;

    try {

        const page = !pageNumber ? 0 : pageNumber;
        const offset = page * pageSize;
        const limit = pageSize;

        Request.get("https://jsonplaceholder.typicode.com/photos", (error, response, body) => {

            if (error) {
                console.log(error);
            }

            let data = JSON.parse(body);

            return res.json({
                ok: true,
                totalPages: Math.ceil(body.length / limit),
                pageSize,
                data: data.slice(offset, offset+limit),
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