import User from "../models/User"
import Role from "../models/Role"

import jwt from 'jsonwebtoken'
require('dotenv').config();

exports.createUser = async (req, res) => {

    const {username, email, password, roles} = req.body;

    try {
        const newUser = new User({
            username,
            email,
            password: await User.encryptPassword(password),

        });

        if(roles) {
            const foundRole = await Role.find({name: {$in: roles}});
            newUser.roles = foundRole.map(role => role._id);
        } else {
            const role = await Role.findOne({name: 'user'});
            newUser.roles = [role._id];
        }

        const saveUser = await newUser.save();

        //Create a new token 
        const token = jwt.sign({id: saveUser._id}, process.env.SECRET, {
            expiresIn: 3600 //1 hour
        });

        res.status(200).json(token);

    } catch (error) {
        res.status(500).json({error});
    }
}
exports.getUsers = async (req, res) => {

    try {
        const users = await User.find();
        res.status(201).json(users);

    } catch (error) {
        res.status(500).json({error})
    }
}
exports.getUserById = async (req, res) => {
    
    const userId = req.params.userId;
    try {
        const userFound = await User.findById({_id: userId});
        res.status(200).json(userFound);

    } catch (error) {
        res.status(500).json({error});
    }
}
exports.updateUserById = async (req, res) => {

    
    const userId = req.params.userId;
    console.log(userId);
    const {username, email, password, roles} = req.body;
    

    if(password) req.body.password = await User.encryptPassword(password)
    
    try {
        const userUpdated = await User.findByIdAndUpdate(userId, {
            username,
            email,
            password: req.body.password,
            roles
        }, {
            new: true
        });
        
        res.status(200).json(userUpdated);

    } catch (error) {
        res.status(500).json({error})
    }
}
exports.deleteUserById = async (req, res) => {

    const userId = req.params.userId;
    try {
        
        const userDeleted = await User.findByIdAndDelete(userId);
        res.status(204).json(userDeleted)
    } catch (error) {
        res.json({error});
    }
}