const mongoose=require("mongoose");
const bookingSchema = mongoose.Schema({
    cin: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"clientModel",
        required:true
    },
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "fieldModel",
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    dateF: {
        type: Date,
        required: true,
    },
    source: {
        type:String,
        required: true,
        default:"Local",
    },
    Status: {
        type:String,
        required: true,
        default:"Confirmée",
    },
    provider:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"providerModel",
        required:true,
    },

}, {
    timestamps:true,
});
module.exports = mongoose.model("bookingModel",bookingSchema)