const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        product_name: { type: DataTypes.STRING, allowNull: false },
        sku: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.FLOAT(11), allowNull: false },
        description: { type: DataTypes.STRING, allowNull: true },
        user_id:{type: DataTypes.INTEGER, allowNull: false}
    };

    return sequelize.define('Product', attributes);
}