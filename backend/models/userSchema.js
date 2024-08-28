import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, "Name must contains at least 3 characters!"],
        maxLength: [32, "Name must contains at most 30 characters!"],
    },
    
    email: {
        type: String,
        required: [true, "Please provide your email"],
        validate: [validator.isEmail, "Please provide a valid email"],

    },

    phone: {
        type: Number,
        required: [true, "please provide your phone number."]
    
    },

    password:{
        type: String,
        required: [true, "please provide your password."],
        minLength:[8, "Paassword must contain atleast 8 characters!"],
        maxLength:[32, "Password must contain atmost 32 characters!"],
        selet : false
    },

    role:{
        type: String,
        required:[true, "Please provide your role"],
        enum:["Job Seeker", "Employer"],
    },

    createAt: {
        type: Date,
        default : Date.now,
    },
});


////hasing the password(encryption)

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password= await bcrypt.hash(this.password, 10);
});

///comparing the password...

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

////generating a jwt token for autherisation

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

export const User=mongoose.model("User",userSchema);