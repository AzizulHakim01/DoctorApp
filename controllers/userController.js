const userModel = require('../models/userModels')
const doctorModel = require('../models/doctorModel')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')


//login callback
const loginController = async (req, res) =>{
    try {
        const user = await userModel.findOne({email:req.body.email})
        if(!user){
            return res.status(200).send({message:"user not found"})
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch){
            return res.status(200).send({message: "invalide email or password", success:false})
        }
        const token = JWT.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
        res.status(200).send({success:true, message:"Logged in successfully", token})
    } catch (error) {
        console.log(error)
        res.status(500).send({success:false, message: `Login Controller ${error.message}`} )
    }
}


//register callback
const registerController = async (req, res) =>{
    try {
        const existingUser = await userModel.findOne({email:req.body.email})
        if(existingUser){
            return res.status(200).send({message:"user Already exist"})
        }

        const password = req.body.password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).send({success:true, message:"User Register Successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).send({success:false, message: `Login Controller ${error.message}`} )
    
    }
}

//auth controller
const authController = async (req, res) =>{
    try {
        const user = await userModel.findById({_id:req.body.userId})
        user.password = ""
        if(!user){
            return res.status(200).send({
                message:"user not found", success:false
            })
        }else{
            res.status(200).send({
                success:true,
                data: user,
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false, message:"Auth Error"
        })
    }
}

//Apply Doctor controller

const applyDoctorController = async (req, res) =>{
    try {
        const newDoctor = await doctorModel({...req.body, status: 'pending' })
        await newDoctor.save()
        const adminUser = await userModel.findOne({isAdmin:true})
        const notification = adminUser.notification
        notification.push({
            type:'apply-doctor-request',
            message:`${newDoctor.firstName} ${newDoctor.lastName} Has Applied For a doctor account`,
            data:{
                doctorId: newDoctor._id,
                name: newDoctor.firstName + " " + newDoctor.lastName,
                onClickPath: '/admin/doctors'
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id,{notification})
        res.status(201).send({
            success:true,
            message:'Doctor Account Applied Successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message: 'Error While Applying for Doctor'
        })
    }
}

//Get All Notificaion Controller

const getAllNotificationCotroller = async (req, res) =>{
    try {
        const user = await userModel.findOne({_id:req.body.userId})
        const seennotification = user.seennotification;
        const notification = user.notification;
        seennotification.push(...notification);
        user.notification = []
        user.seennotification = notification;
        const updatedUser = await user.save()
        res.status(200).send({
            success:true,
            message: "All Notification marked as read",
            data: updatedUser,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in notification",
            success:false,
            error
        })
    }
}

module.exports = {
    loginController, registerController, authController, applyDoctorController, getAllNotificationCotroller
}