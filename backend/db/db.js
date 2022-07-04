const mongoose = require('mongoose')
require('dotenv').config()
// const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.0bwxa.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const mongoURI = process.env.MONGO_URI;



const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('mongo db connected successfully')
    } catch (error) {
        console.log('there is error while connection to mongo', error)
    }
} 

module.exports = connectToMongo