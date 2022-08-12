const mongoose = require('mongoose');

const dbConnection = async() => {
    //Intentar conectar a la base de datos
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('db online');
        
    //Si hay un error, mostrarlo e imprimir en consola
    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar la DB')
    }
};

module.exports = {
    dbConnection
}