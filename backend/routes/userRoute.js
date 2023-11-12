const express =require("express");
const {registerUser, loginUser, logout, getUser, updateCurrentUser, changePassword, updateuser,getAllUsers, deletById} = require("../controllers/userController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout",logout);
router.get("/getUser", protect,getUser);
router.delete("/delete/:id", protect,deletById);
router.get("/getAll", protect,getAllUsers);
router.patch("/updateCurrentUser",protect, updateCurrentUser);
router.patch("/update/:id",protect, updateuser);
router.patch("/changePassword",protect, changePassword);



module.exports = router;