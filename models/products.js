module.exports = function(sequelize, DataTypes) {
    const Product = sequelize.define("Product", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        range: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [["TYPE-2", "TYPE-3"]]
            }
        },
        finish: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [["P-B", "P-P", "B-B", "PE-PE", "P", "B"]]
            }
        },
        material: {
            type: DataTypes.STRING,
            isIn: [["H40", "J55", "K55", "N80-1", "L80"]],
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
            is: /[A-Z]+\d+$/
        },
        warehouse: {
            type: DataTypes.STRING,
            allowNull: false,
            is: /[A-Z]+\d+$/
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            notNull: false,
            isIn: [["DAMAGED", "GOOD", "WIP", "STORAGE", "TRANSIT"]]
        }
    });
    Product.associate = function(models){
        Product.belongsTo(models.SO, {foreignKey: "salesOrder", targetKey: "salesOrder"})
    };
    return Product;
};

