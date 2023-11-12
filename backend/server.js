const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const clientRoute = require("./routes/clientRoute");
const providerRoute = require("./routes/providerRoute");
const bookingRoute = require("./routes/bookingRoute");
const fieldRoute = require("./routes/fieldRoute");
const errorHandler=require("./middlewares/errorMiddleware");
const cookiePa=require("cookie-parser");
const {getUser} = require("./controllers/userController");

const app = express();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors({
    credentials:true,
    origin: 'http://localhost:3000',
}));
app.use(cookiePa());

//Routes Middleware
app.use("/api/users",userRoute);
app.use("/api/providers",providerRoute);
app.use("/api/clients",clientRoute);
app.use("/api/booking",bookingRoute);
app.use("/api/field",fieldRoute);

// Routes
app.get("/",(req,res)=>{
    res.send("Home Page");
});

//Error Middleware
app.use(errorHandler);
//connect to db and start server

mongoose
    .connect(process.env.MONGO_URI)
    .then(() =>{
        app.listen(PORT,()=> {
        console.log(`Server running on port ${PORT}`)

        })

    })
    .catch((err) =>console.log(err))