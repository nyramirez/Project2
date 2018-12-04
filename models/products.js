module.exports = function(sequelize, DataTypes) {
    const Product = sequelize.define("Product", {
        id: DataTypes.STRING,
        range: DataTypes.STRING,
        finish: DataTypes.STRING,
        quantity: DataTypes.INT,
        location: DataTypes.STRING,
        warehouse: DataTypes.STRING,
        material: DataTypes.STRING,
        customer_name: DataTypes.STRING,
        po: DataTypes.INT,
        so: DataTypes.INT,
        description: DataTypes.STRING,
        status: DataTypes.STRING
    });

    return Product;
};

