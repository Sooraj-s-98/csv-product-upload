const express = require("express");
const router = express.Router();
const csvController = require("./csv.controller");
const multer = require("multer");
const fs = require("fs");
const csv = require("fast-csv");

global.__basedir = __dirname;

// Multer Upload Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + '/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
});

// Filter for CSV file
const csvFilter = (req, file, cb) => {
    if (file.mimetype.includes("csv")) {
        cb(null, true);
    } else {
        cb("Please upload only csv file.", false);
    }
};
const upload = multer({ storage: storage, fileFilter: csvFilter });

router.post('/upload',
upload.single("file"), (req, res) => {
    try {
        if (req.files.file == undefined) {
            return res.status(400).send({
                message: "Please upload a CSV file!"
            });
        }

        let products = [];
        let filePath = __basedir + '/uploads/' + req.files.file.name;
        fs.createReadStream(filePath)
            .pipe(csv.parse({ headers: true }))
            .on("error", (error) => {
                throw error.message;
            })
            .on("data", (row) => {
                products.push(row);
            })
            .on("end", () => {

             productService.checkProductShema(products, req.user.id)
                .then(() => {
                          res.status(200).send({
                            message:
                              "Uploaded the file successfully: " ,
                          });
                        })}).catch(err => {
                    res.status(500).send({
                        message: "Fail to import data into database!",
                        error: err.message,
                    });
                });
    } catch (error) {
        console.log("catch error-", error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
});
router.post('/list',  csvController.getProducts);

module.exports = router;