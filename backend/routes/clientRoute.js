const express =require("express");
const {addClient, getAllClients, updateClient, deletId} = require("../controllers/clientController");
const protect = require("../middlewares/authMiddleware");



const router = express.Router();
router.post("/Add",protect,addClient);
router.get("/all",protect,getAllClients);
router.patch("/update/:id",protect,updateClient);
router.delete("/delete/:id",protect,deletId);





module.exports = router;