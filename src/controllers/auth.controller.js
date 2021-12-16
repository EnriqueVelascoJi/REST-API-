import User from "../models/User"
import Role from '../models/Role'

//Import jwt
import jwt from 'jsonwebtoken'
require('dotenv').config();

exports.signUp = async (req, res) => {
    
    const {username, email, password, roles} = req.body;

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    });

    try {

        if(roles) {
           const foundRole =  await Role.find({name: {$in: roles}})
           newUser.roles = foundRole.map(role => role._id);
        } else {
            const role = await Role.findOne({name: 'user'});
            newUser.roles = [role._id];
        }
        const userSaved = await newUser.save();

        //Create a new token
        const token = jwt.sign({id: userSaved._id}, process.env.SECRET, {
            expiresIn: 3600 //1 hours
        });

        res.json(token);

    } catch (error) {
        res.status(500).json({error});
    }
    
}
 
exports.signIn = async (req, res) => {
    
    const {email, password} = req.body;
    
    try {
        const userFound = await User.findOne({email}).populate("roles");
        if(!userFound) return res.json({message: "User not found"})

        const matchPassword = await User.comparePassword(password, userFound.password);
        if(!matchPassword) return res.json({token: null, message: "Invalid Password"})

        const token = jwt.sign({id: userFound._id}, process.env.SECRET, {
            expiresIn: 3600
        });

        res.json({token});

    } catch (error) {
        res.json({error})
    }
}



