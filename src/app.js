//Import modules
import express from 'express'
import morgan from 'morgan'

//Import metadata
import pkg from '../package.json'

//Import routes file
import productsRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'
import usersRoutes from './routes/user.routes'

//Import the roles
import Roles from './libs/initialSetup'

//Creating the server
const app = express();

//Create the roles
Roles.createRoles();

//Variables de express
app.set('pkg', pkg);

//Middlewares
app.use(express.json());
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
});

//Routes
app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

export default app;