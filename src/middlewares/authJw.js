//Importamos JWT
import jwt from 'jsonwebtoken'
import User from '../models/User';
import Role from '../models/Role';

require('dotenv').config();

exports.verifyToken = async(req, res, next) => {

   try {
        const token = req.headers["x-access-token"];

        if(!token) return res.status(403).json({message: "No token provided"})

        const decoded = jwt.verify(token, process.env.SECRET);
        req.userId = decoded.id;

        const user = await User.findById(req.userId);

        if(!user) return res.status(404).json({message: "No user found"})
        next();
   } catch (error) {
       return res.status(500).json({message: "Unauthorized"})
   }
}

exports.isModerator = async (req, res, next) => {

    const moderator = await User.findById(req.userId);
    const roles = await Role.find({_id: {$in: moderator.roles}});
    
    for(let i = 0; i < roles.length; i++) {
        if(roles[i].name === "moderator") {
            next();
            return
        } 
    }
    return res.status(403).json({message: "Moderator role is required"});
}
exports.isAdmin = async (req, res, next) => {

    const admin = await User.findById(req.userId);
    const roles = await Role.find({_id: {$in: admin.roles}});
    
    for(let i = 0; i < roles.length; i++) {
        if(roles[i].name === "admin") {
            next();
            return
        } 
    }
    return res.status(403).json({message: "Admin role is required"});
}