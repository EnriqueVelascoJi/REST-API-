import mongoose from 'mongoose'
require('dotenv').config();

const ENV = process.env;
//DB Connection
mongoose.connect(`mongodb+srv://${ENV.USER}:${ENV.PASSWORD}@learningcluster.xlfnt.mongodb.net/${ENV.DBNAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('DB is connected'))
    .catch(err => console.log(err));