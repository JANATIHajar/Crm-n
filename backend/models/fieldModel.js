const mongoose=require("mongoose");
const fieldSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    venue: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: [true, "please add a password"],
    },
    photo: {
        type: String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9r6Zbzy6OAmrk5JXOEBSDBQDA0SIY6kLRC0CnigY&s"

    },
    provider:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'providerModel'
    },
}, {
    timestamps:true,
});
module.exports = mongoose.model("fieldModel",fieldSchema)