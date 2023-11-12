const express =require("express");
const {addField, getAllFields} = require("../controllers/filedController");
const protect = require("../middlewares/authMiddleware");


const router = express.Router();
router.post("/add", protect,addField);
router.get("/all", protect,getAllFields);

module.exports = router;module.exports = router;