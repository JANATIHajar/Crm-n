const express =require("express");
const {registerProvider, getProvider} = require("../controllers/providerController");
const protect = require("../middlewares/authMiddleware");



const router = express.Router();
router.post("/register",registerProvider);
router.get("/get", getProvider);


module.exports = router;