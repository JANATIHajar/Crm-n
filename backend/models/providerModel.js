const mongoose= require("mongoose");
const providerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
        unique: true,
    },
    logo: {
       type:String,
        required: true,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9r6Zbzy6OAmrk5JXOEBSDBQDA0SIY6kLRC0CnigY&s"
    },
        clients:[{
            firstName:{
                type: String
            },
            lastName:{
                type:String
            },
            CIN:{
                type:String
            },
            phone:{
                type:String,
                default:"+212"
            }
        }]
},

{
    timestamps:true,
}

);
module.exports = mongoose.model("providerModel",providerSchema)
