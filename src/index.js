import app from './app.js';
import './database.js'

require('dotenv').config();


//Defining the port
const PORT = process.env.PORT;
app.listen(PORT, ()=> {
    console.log('Server listen on port', PORT)
})