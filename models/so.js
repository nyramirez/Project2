module.exports = function(sequelize, DataTypes) {
    const SO = sequelize.define("SO", {
        salesOrder: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        orderQty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                isInt: true
            }
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            isIn: [["WIP", "DELAYED", "COMPLETE", "TRANSIT"]]
        }
        
    });
    SO.associate = function(models){
        
        SO.belongsTo(models.PO, {foreignKey: "purchaseOrder", targetKey: "purchaseOrder"});
        // SO.hasMany(models.Product, {foreignKey: "id", sourceKey: "id"});
    };
    return SO;
};