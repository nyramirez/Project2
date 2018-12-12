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
                isIn: [["RANGE-2", "RANGE-3"]]
            }
        },
        finish: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [["P-B", "P-P", "B-B", "PE-PE", "P", "B"]]
            }
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [["A1", "A2", "A3", "A4", "A5", "A6", "TRANSIT"]]
            }
        },
        warehouse: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /[A-Z]+\d+$/
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            notNull: false,
            validate: {
                isIn: [["DAMAGED", "GOOD", "QC-INSPECT"]]
            }
        }
    });
    Product.associate = function(models) {
        Product.belongsTo(models.SO, {
            foreignKey: "salesOrder",
            targetKey: "salesOrder"
        });
    };
    return Product;
};
