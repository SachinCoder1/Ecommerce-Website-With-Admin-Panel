const mongoose = require('mongoose')
require('env').config()
// const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.0bwxa.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const mongoURI = 'mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false'



const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('mongo db connected successfully')
    } catch (error) {
        console.log('there is error while connection to mongo', error)
    }
}

export default connectToMongo