const express = require('express');
const router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const env = require('dotenv');
const messageapi=require('../middleware/msg.js');
const JWT_SECRET = process.env.JWT_TOKEN;
const fetchuser=require('../middleware/fetchdata.js');
module.exports=(book,query)=>{
    router.post('/querypost', fetchuser,async (req, res) => { // for query
        try{
            const {email,message,contact}=req.body;
            const params={
                email: email,
                message: message,
                contact:contact,
                userid:req.userid
            }
            const note=await query.insertOne(params);
            console.log(params)
            res.status(201).json({message: 'complaint rejistered successfully', note: note });
            try{
                messageapi(contact,'complaint registered successfully');
            }
            catch(err){
                console.error(err);
                res.status(500).json({ error: "internal server error" });
            }
        }
        catch(err){
            console.error(err);
            res.status(500).json({ error: "internal server error2" ,message:err.message});
        }
    });
    router.post('/submitformdata', fetchuser,async (req, res) => { // for query
        try{
            const {email,message,contact,time,date}=req.body;
            // ai search algo --> python request --> python response --> nodejs response
            // inside try catch block

            const params={
                email: email,
                message: message,
                contact:contact,
                userid:req.userid,
                time:time,
                date:date
            }
            const note=await book.insertOne(params);
            console.log(params)
            res.status(201).json({message: 'complaint rejistered successfully', note: note });
            try{
                messageapi(contact,'appointment booked successfully ');
            }
            catch(err){
                console.error(err);
                res.status(500).json({ error: "internal server error" });
            }
        }
        catch(err){
            console.error(err);
            res.status(500).json({ error: "internal server error2" ,message:err.message});
        }
    });
    return router;
}