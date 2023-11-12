const express =require("express");
const {addBooking, getAll} = require("../controllers/bookingController");
const protect = require("../middlewares/authMiddleware");
const {deletId} = require("../controllers/clientController");

const router = express.Router();
router.post("/add",protect, addBooking);
router.get("/ALL",protect, getAll);
router.delete("/delete/:id",protect, deletId);
module.exports = router;module.exports = router;