const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGO_URl)

const db = mongoose.connection;

db.on('connected', () => {console.log('Mongo DB connection Successful')}
);

db.on('error', (err) => {console.log('Mongo DB Connection Failed')})

module.exports = db;