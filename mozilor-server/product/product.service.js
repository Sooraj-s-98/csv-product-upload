const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');

async function create(params) {

    // save Product
    await db.Products.create(params);
}


const checkProductShema= function (data,user_id)
{
 return new Promise(function(resolve, reject)
 {
  try {
    //   console.log('promise data', data)
    data.forEach((item)=>{
       // productSchema({...item, price: parseFloat(item.price)})
        create({...item, price: parseFloat(item.price), user_id:user_id})
    })
    resolve("workDone")
  } 
  catch (err){
    reject("why")
  }
});
}
function productSchema(req, res, next) {
    const schema = Joi.object({
      product_name: Joi.required(),
      sku: Joi.required(),
      description: Joi.required(),
      price: Joi.required(),
    });
    validateRequest(req, next, schema);
  }
module.exports = {
    create,
    checkProductShema
};