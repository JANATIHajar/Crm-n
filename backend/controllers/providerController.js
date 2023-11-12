const Provider = require("../models/providerModel");
const asyncHandler = require("express-async-handler");

const registerProvider = asyncHandler(async (req, res) => {
    const {name} = req.body

    const providerExists = await Provider.findOne({name})
    if (providerExists) {
        res.status(400)
        throw new Error("provider exists")
    }
//create provider
    const provider = await Provider.create({
        name,

    })
    if (provider) {
        const {id, name} = provider
        res.status(201).json({
            id,
            name,
        });
    } else {
        res.status(400)
        throw new Error("invalid user data")
    }
});
//Grt provider infos
const getProvider = asyncHandler(async (req,res) =>{
    const providerName = req.body;
    const provider = await Provider.find({name:providerName});
    if (provider){
        res.status(200).json(provider);
    }
    else {
        res.statut(404);
        throw new Error("provider n'existe pas '");
    }

})
module.exports = {
    registerProvider,
    getProvider,
};