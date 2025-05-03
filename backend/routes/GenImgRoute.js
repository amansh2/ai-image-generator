const express= require("express");
const { generateImage } = require("../controllers/GenerateImage.js");

const router = express.Router();

router.post("/", generateImage);

module.exports = router
