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

    const {pageNumber, pageSize} = req.query;

    try {

        const page = !pageNumber ? 1 : pageNumber;
        const offset = page * pageSize;
        const limit = Number(offset) + Number(pageSize);

        Request.get("https://jsonplaceholder.typicode.com/photos", (error, response, body) => {

            if (error) {
                console.log(error);
            }

            let data = JSON.parse(body);

            return res.json({
                ok: true,
                page: pageNumber,
                totalPages: Math.ceil(data.length / pageSize),
                pageSize,
                data: data.slice((offset - pageSize), (limit - pageSize)),
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