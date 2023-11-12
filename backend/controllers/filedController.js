const asyncHandler = require("express-async-handler");
const Field = require('../models/fieldModel');
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Client = require("../models/clientModel");

const addField = asyncHandler(async (req, res) =>{
    const {name, venue , price } = req.body;
    const prov = req.user.provider;

    if (!name ||!venue  || !price  ) {
        res.status(400)
        throw new Error("please fill in the required fields");
    }

    const fieldExist = await Field.findOne({name: name});
    if(fieldExist){
        res.status(400);
        throw new Error('field already exist');
    }
    else {
        const field = await Field.create({
           name,
           venue,
           price,
           provider: prov,
        })
        if(field){
            res.status(201).json(field);
        }
        else{
            res.status(400);
            throw new Error('invalid info');
        }
    }
});
// getAllfields
const getAllFields = asyncHandler(async (req, res) =>{

    const prov = req.user.provider;
    const allfields=await  Field.find({provider: prov});
    if(allfields){
        return res.json(allfields);}
    else {
        res.status(400)
        throw new Error("no clients");
    }
});
module.exports = {
    addField,getAllFields,
}
