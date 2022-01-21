const db = require('_helpers/db');
const Products = db.Products;
const fs = require("fs");
const csv = require("fast-csv");
const productService = require('./product.service');
const { Op } = require("sequelize");

const upload = async (req, res) => {
  try {
    const file = req.files.file
    // const reader = fs.createReadStream(file)
    const stream = fs.createWriteStream(`./upload`.join(os.tmpdir(), Math.random().toString()))
    // reader.pipe(stream)
    strem.write(file)
    console.log('uploading %s -> %s', file.name, stream.path)
    // if (req.files.file == undefined) {
    //   return res.status(400).send("Please upload a CSV file!");
    // }
  // console.log("req",req.files.file)
  //   let products = [];
  //   var fileStream = fs.createWriteStream("./upload");
  //   fileStream.write(req.files.file.data);
  //   fileStream.end();
    
  //   fileStream.on('error', function (err) {
  //       //console.log("error",err);
  //       res.status(500).send({
  //         message: "Could not upload the file: " ,
  //       });
  //   });
  //   fileStream.on('finish', function (res) {
  //       //console.log("finish",res);
  //   });
  //   fs.createReadStream(fileStream.path)
  //     .pipe(csv.parse({ headers: true }))
  //     .on("error", (error) => {
  //       throw error.message;
  //     })
  //     .on("data", (row) => {
  //       console.log("row",row);
  //       products.push(row);
  //     })
  //     .on("end", () => {

  //       productService.checkProductShema(products, req.user.id)
  //         .then(() => {
  //           res.status(200).send({
  //             message:
  //               "Uploaded the file successfully: " ,
  //           });
  //         })
  //         .catch((error) => {
  //           res.status(500).send({
  //             message: "Fail to import data into database!",
  //             error: error.message,
  //           });
  //         });
  //     });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " ,
    });
  }
};

const getProducts = (req, res) => {
  db.Products.findAll({
    where: {
      user_id:req.user.id,
    },
    attributes: ["product_name","sku","price","description"]
  }).then((data) => {
      res.status(200).send({data});
      
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    });
};


module.exports = {
  upload,
  getProducts
};