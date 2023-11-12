const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Provider = require("../models/providerModel");
const Client = require("../models/clientModel");

//Generate Token
const genereteToken = (id) =>{
return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:"1d" })
};

// Add User
const registerUser = asyncHandler(async (req, res) => {
    const {name,subname, email, password,prov} = req.body
    const provider = await Provider.findOne({name:prov})

    //validation
    if (!name ||!subname || !email || !password || !prov) {
        res.status(400)
        throw new Error("please fill in the required fields");
    }
    if (password.length < 6) {
        res.status(400)
        throw new Error("password must be up to 6 characters")
    }

    //check if user email already exists
    const userExists =await User.findOne({email})
    if (userExists){
        res.status(400)
        throw new Error("Email has already benn registred")
    }
    if(provider == null){
        res.status(400)
        throw new Error("Enter un complexe valide ")
    }
    //create user
    const user = await User.create({
        name,
        subname,
        email,
        password,
        provider,

    })

    //Generate Token
    const token = genereteToken(user.id);

    //send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() +1000*86400), // 1 day
        sameSite:"none",
        secure: true
    });
    if(user){
        const {id,name,email,phone, photo}=user
        res.status(201).json({
            id,
            name,
            subname,
            email,
            phone,
            photo,
            provider,
            token,
        });
    }else {
        res.status(400)
        throw new Error("invalid user data")
    }

});
//getAllUsers
const getAllUsers = asyncHandler(async (req, res) =>{

    const prov = req.user.provider;
    const allUsers=await  User.find({provider: prov,});
    if(allUsers){
        return res.json(allUsers);}
    else {
        res.status(400)
        throw new Error("no clients");
    }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
    const {email, password}= req.body;

    //validate Request
    if (!email || !password)
    {
        res.status(400);
        throw new Error("Please add email and password");
    }

    // Check if user exist
    const  user = await User.findOne({email});
    if (!user)
    {
        res.status(400);
        throw new Error("User not found ");
    }

    // Check password
    const passwordIsCorrect= await bcrypt.compare(password, user.password);
    if (!passwordIsCorrect) {
        res.status(422).json("password incorrect");
    }

    //Generate Token
    const token = genereteToken(user.id);

    //send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() +1000*86400), // 1 day
        sameSite:"none",
        secure: true
    });



     if (user && passwordIsCorrect){
         const {id,name,subname,email,phone, photo}=user;
         res.status(200).json({
             id,
             name,
             subname,
             email,
             phone,
             photo,
             token,
         })
     }
     else{
         res.status(400);
         throw new Error("invalid email or password");
     }

});
//Logout User
const logout = asyncHandler(async (req,res) => {

    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite:"none",
        secure: true,
    });
    return res.status(200).json({message: "Successfully logged out"});
});

//Get User Data
    const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        const { id, name,subname, email, photo, phone, provider} = user;
        res.status(200).json({
            id,
            name,
            subname,
            email,
            photo,
            phone,
            provider
        });
    } else {
        res.status(400);
        throw new Error("User Not Found");
    }
});
    //Update Cuurrent User
   const updateCurrentUser = asyncHandler (async (req, res) => {
    const user = await User.findById(req.user.id);
    if(user) {
        const {  name, email, photo, phone } = user;
        user.email = email;
        user.name = req.body.name || name;
        user.subname = req.body.subname || subname;
        user.phone = req.body.phone || phone;
        user.photo = req.body.photo || photo;

        const updatedUser=await user.save();
        res.status(200).json({
            id: updatedUser.id,
            name: updatedUser.name,
            subname: updatedUser.subname,
            email: updatedUser.email,
            phone: updatedUser.phone,
            photo: updatedUser.photo,
        })
    }else {
        res.status(404);
        throw new Error("User not found");
    }
    });

    //Change Password
    const changePassword = asyncHandler(async(req, res) => {
        const user = await User.findById(req.user.id);

        const {oldPassword, password} =req.body;

        if(!user){
            res.status(404);
            throw new Error("User not found, please sign up");
        }        //validate
        if(!oldPassword || !password){
            res.status(404);
            throw new Error("Please add old and new password");
        }

        //Check if password matches password in db
        const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

        //Save new Password
        if(user && passwordIsCorrect){
            user.password=password;
            await user.save();
            res.status(200).send("Password changed successfuly")
        }else{
            res.status(404);
            throw new Error("old Password is incorrect");

        }


    });
const updateuser = asyncHandler(async (req, res) =>{
    const user = await  User.findByIdAndUpdate(req.params.id,req.body);
    if (updateuser){
        const {name,subname,email, phone ,provider} = user;
        user.name = req.body.name || name;
        user.subname = req.body.subname || subname;
        user.email = email;
        user.phone = req.body.phone || phone;
        user.provider = provider;
        return res.status(200).json(client);
    }
    else{
        res.status(400)
        throw new Error("Gestionnaire n'existe pas ");
    }


});
//delete
const deletById = asyncHandler(async(req, res)  => {
    const id = req.params.id;
    const prov = req.user.provider
    const userDeleted = await User.findOneAndDelete({_id: id , provider: prov})
    if(userDeleted){
        return res.status(200).json(userDeleted);
    }
    else {
        res.status(400);
        throw new Error("Gestionnaire n'existe pas ");
    }


});

 module.exports = {
    registerUser,
     loginUser,
     logout,
     getUser,
     updateCurrentUser,
     changePassword,
     getAllUsers,
     updateuser,
     deletById
 };
