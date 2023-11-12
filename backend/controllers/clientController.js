const asyncHandler = require("express-async-handler");
const Client = require("../models/clientModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const {getUser} = require("../controllers/userController");

// Add Client
const addClient = asyncHandler(async (req, res) => {
    const {firstName, lastName, CIN,Email, phone,addresse }= req.body;
    const prov = req.user.provider;

    //validation
    if (!firstName ||!lastName  || !CIN  ) {
        res.status(400)
        throw new Error("please fill in the required fields");
    }


    //check if user email already exists
    const clientExists =await Client.findOne({CIN: CIN, provider: prov})
    if (clientExists){
        res.status(400)
        throw new Error("client  already exist")
    }
    //create client
    const client = await Client.create({
        firstName,
        lastName,
        CIN,
        Email,
        addresse,
        phone,
        provider:prov,
    })


    if(client){
        const {id,firstName,lastName, CIN,Email,phone,provider,addresse}=client
        res.status(201).json({
            id,
            firstName,
            lastName,
            CIN,
            Email,
            phone,
            addresse,
            provider,


        });
        req.user.provider.client.push(client);

    }else {
        res.status(400)
        throw new Error("invalid user data")
    }

});
//getAllClients
const getAllClients = asyncHandler(async (req, res) =>{

    const prov = req.user.provider;
    const allClients=await  Client.find({provider: prov});
    if(allClients){
    return res.json(allClients);}
    else {
        res.status(400)
        throw new Error("no clients");
    }
});
//Update
const updateClient = asyncHandler(async (req, res) =>{
    const client = await  Client.findByIdAndUpdate(req.params.id,req.body);
    if (client){
        const {firsName,lastName,CIN, phone,provider,addresse } = client;
        client.firstName = req.body.firstName || firsName;
        client.lastName = req.body.lastName || lastName;
        client.CIN = CIN;
        client.addresse=req.body.addresse || addresse;
        client.Email=req.body.Email || Email;
        client.phone = req.body.phone || phone;
        client.provider = provider;
        return res.status(200).json(client);
    }
    else{
        res.status(400)
        throw new Error("client n'existe pas ");
    }


});
//find by CIN
const getByCin = asyncHandler(async (req, res) => {
    const prov = req.user.provider;
    const clientCin= await  Client.findOne({CIN: req.body,provider:prov});
    if (clientCin){
        return res.status(200).json(clientCin);
    }
    else {
        res.status(400)
        throw new Error("cilent n'exsiste pas ")
    }

});
// findByid and  delete
const deletId = asyncHandler(async(req, res)  => {
    const id = req.params.id;
    const prov = req.user.provider
    const clientDeleted = await Client.findOneAndDelete({_id: id , provider: prov})
    if(clientDeleted){
        return res.status(200).json(clientDeleted);
    }
    else {
        res.status(400);
        throw new Error("client n'existe pas ");
    }


});








module.exports = {
    addClient,
    getAllClients,
    updateClient,
    deletId,
    getByCin

};
