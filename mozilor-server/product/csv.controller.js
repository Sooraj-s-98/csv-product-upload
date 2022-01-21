const db = require('_helpers/db');
const Products = db.Products;
const fs = require("fs");
const csv = require("fast-csv");
const productService = require('./product.service');
const { Op } = require("sequelize");

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    let products = [];
    let path = req.file.path;

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        console.log("row",row);
        products.push(row);
      })
      .on("end", () => {

        productService.checkProductShema(products, req.user.id)
          .then(() => {
            res.status(200).send({
              message:
                "Uploaded the file successfully: " + req.file.originalname,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Fail to import data into database!",
              error: error.message,
            });
          });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
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