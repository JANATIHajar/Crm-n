const mongoose=require("mongoose");

const clientSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please add a firstname"]
    },
    lastName: {
        type: String,
        required: [true, "Please add a lastname"]

    },
    CIN: {
        type: String,
        unique:true,
        required: true

    },
    addresse: {
        type: String,

    },
    Email: {
        type: String,
        unique:true,
        required: true

    },

    phone: {
        type: String,
        default: "+212"
    },
    provider:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'providerModel'
    },
}, {
    timestamps:true,
});

module.exports = mongoose.model("clientModel",clientSchema)
