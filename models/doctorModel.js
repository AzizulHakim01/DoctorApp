const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    userId:{
        type: String,
    },
    firstName:{
        type: String,
        required:[true, "first name is required"]
    },
    lastName:{
        type: String,
        required:[true, "Last name is required"]
    },
    phone:{
        type:String,
        required:[true, "Phone number is required"]
    },
    email:{
        type:String,
        required:[true, "email is required"]
    },
    website:{
        type:String
    },
    address:{
        type:String,
        required:[true, "Address is required"]
    },
    specialization:{
        type:String,
        required:[true, "Specialization is required"]
    },
    experience:{
        type:String,
        required:[true, "experience is required"]
    },
    fees:{
        type: Number,
        required:[true, "Fees is required"]
    },
    timing:{
        type:Object,
        required:[true, 'timing is required']
    },
    status:{
        type:String,
        default:'pending'
    }
}, {timestamps: true})

const doctorModel = mongoose.model("doctors", doctorSchema)
module.exports = doctorModel