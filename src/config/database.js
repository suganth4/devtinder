const mongoose = require('mongoose');

const connectDb = async function () {
    return mongoose.connect('mongodb+srv://Node:Node@cluster0.1y75onn.mongodb.net/devTinder')
}

module.exports = {
    connectDb
}