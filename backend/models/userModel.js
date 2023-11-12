const mongoose=require("mongoose");
const bcrypt= require("bcrypt");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    subname: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        unique:true,
        required: true,
        trim: true,
        match: [
            /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            "Please enter a valid email"
        ]

        },
    password: {
        type: String,
        required: [true, "please add a password"],
        minLength: [6, "Password must be up to 6 characters"],
        //maxLength: [23, "Password must not be more to 23 characters"],

    },
    photo: {
        type: String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9r6Zbzy6OAmrk5JXOEBSDBQDA0SIY6kLRC0CnigY&s"

    },
    phone: {
        type: String,
        default: "+212"
    },
    provider:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'providerModel'
    },
    is_Admin:{
        type: String,
        required:true,
        default:"false",
    }
}, {
    timestamps:true,
});
//Encrypt password before saving to db
userSchema.pre("save",async function(next){
    if (!this.isModified("password"))
    {
        return next();
    }

    //Hash password
    const salt =await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(this.password, salt);
    this.password=hashedpassword;
    next();
});


module.exports = mongoose.model("userModel",userSchema)
