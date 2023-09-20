const express = require('express');
const router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const env = require('dotenv');
const messageapi=require('../middleware/msg.js');
const JWT_SECRET = process.env.JWT_TOKEN;
module.exports=(patients) => {
    router.post('/signup', async (req, res) => {
        try{
            const {email,name,password,contact}=req.body;
            const existingUser = await patients.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: 'User with this email already exists' });
            }
            const hashedPassword = await bcrypt.hash(password, 10); 
            const params={
                name: name,
                email: email,
                password: hashedPassword,
                contact:contact
            }
            await patients.insertOne(params);
            const user=await patients.findOne({ email });
            const tokenPayload={
                userId:user._id,
                action:"some-action"
            }
            console.log(user._id);
            const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' });
            res.status(201).json({message: 'User created successfully', token: token });
            console.log(user)
            console.log(tokenPayload);
            try{
                messageapi(contact,`${name} Signup success!!`);
            }
            catch(err){
                console.error(err);
                res.status(500).json({ error: "internal server error" });
            }
        }
        catch(err){
            console.error(err);
            res.status(500).json({ error: "internal server error" ,message:err.message});
        }
    });
    router.get('/login', async (req, res) => {
        try{
            const {email,password}=req.body;
            const User = await patients.findOne({ email });
            if (!User) {
                return res.status(409).json({ message: 'User with this email do not exists' });
            }
            const passwordCompare = await bcrypt.compare(password,  User.password);
            if (!passwordCompare) {
                return res.status(400).json({error: "Incorrect email or password" });
            }
            const tokenPayload={
                userId: User.id,
                action:"some-action"
            }
            const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' });
            res.status(201).json({message: 'User found', token: token });
            try{
                messageapi(contact,`${User.name} Login Success!!`);

            }
            catch(err){
                console.error(err);
                res.status(500).json({ error: "internal server error" });
            }
        }
        catch(error){
            console.error(err);
            res.status(500).json({ error: "internal server error" });
        }
    });
    return router;  
}