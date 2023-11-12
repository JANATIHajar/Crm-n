const asyncHandler = require("express-async-handler");
const Booking = require('../models/bookingModel');
const Client = require('../models/clientModel');
const Field = require('../models/fieldModel');
const User = require("../models/userModel");

const addBooking = asyncHandler(async (req, res) => {
    const { cin, name, date,dateF,Status,source} = req.body;
    const prov = req.user.provider;
    const clientExist = await Client.findOne({CIN: cin, provider: prov});
    const fieldExist = await Field.findOne({name: name , provider: prov});

    //validation
    if (!cin || !name || !date ||!dateF ){
        res.status(400)
        throw new Error("please fill in the required fields");
    }
    if(!clientExist || !fieldExist){
        res.status(400);
        throw new Error("client ou terrain n'existe pas")
    }


    //check if bookingalready exists

    const bookingExists = await Booking.findOne({name: fieldExist._id,  date: {
            $gte: date,
            $lt: dateF,
        },dateF: {
            $gte: date,
            $lt: dateF,
        }, provider: prov})
    if (bookingExists) {
        res.status(400)
        throw new Error("booking already exist")
    }
    //create client
    const booking = await Booking.create({
        cin: clientExist,
        name:fieldExist,
        Status ,
        source,
        date,
        dateF,
        provider: prov,
    })


    if (booking) {
        res.status(201).json({booking
        });
    } else {
        res.status(400)
        throw new Error("invalid booking data")
    }
});

// getAll booking
const getAll = asyncHandler(async (req, res) => {
    const prov = req.user.provider
    const bookings = await Booking.find({provider:prov}).populate('cin', 'CIN')
        .populate('name', 'name');

    return res.json(bookings);

});
const deletId = asyncHandler(async(req, res)  => {
    const id = req.params.id;
    const prov = req.user.provider
    const ReservationDeleted = await Booking.findOneAndDelete({_id: id ,provider:prov})
    if(ReservationDeleted){
        return res.status(200).json(ReservationDeleted);
    }
    else {
        res.status(400);
        throw new Error("client n'existe pas ");
    }


});
module.exports = {
    addBooking,
    getAll,
    deletId,
}
