const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser)
            return res.status(400).json({message: "User already exists"});

        const user = new User({name, email, password});
        await user.save();

        res.status(201).json("User created successfully");
    }

    catch(err){
        res.status(500).json({message: err.message});
    }
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
            return res.status(400).json({message: "Invalid Credentials"});

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.json({token});

    }

    catch(err){
        res.status(500).json({message: err.message});
    }
}

module.exports={signup, login};