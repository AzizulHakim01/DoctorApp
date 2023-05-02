const express = require('express');
const { loginController, registerController, authController, applyDoctorController, getAllNotificationCotroller } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router()

//Router
//LOGIN || POST
router.post('/login', loginController)

//Register || POST
router.post('/register', registerController)

//Auth || POST
router.post('/getUserData', authMiddleware, authController)

//APPLY || DOCTOR
router.post("/apply-doctor", authMiddleware, applyDoctorController)

//Notification Doctor || POST
router.post("/get-all-notification", authMiddleware, getAllNotificationCotroller)

module.exports = router;