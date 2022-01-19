const multer = require("multer");
let moment = require('moment');
const hash = require('random-hash');
const path = require('path');

const csvFilter = (req, file, cb) => {
  if (file.mimetype.includes("csv")) {
    cb(null, true);
  } else {
    cb("Please upload only csv file.", false);
  }
};
let fileName = moment().unix().toString();
let ePath;

var storage =  multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/');
    },
    filename: function (req, file, callback) {
        callback(null, `${fileName + path.extname(file.originalname)}`);
    }
});

var uploadFile = multer({ storage: storage, fileFilter: csvFilter });
module.exports = uploadFile;