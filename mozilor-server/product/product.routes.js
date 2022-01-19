const express = require("express");
const router = express.Router();
const csvController = require("./csv.controller");
const upload = require("./upload");


router.post('/upload', upload.single("file"), csvController.upload);
router.post('/list',  csvController.getProducts);

module.exports = router;