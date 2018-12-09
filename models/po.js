module.exports = function(sequelize, DataTypes) {
    const PO = sequelize.define("PO", {
        purchaseOrder: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        contact: {
            type: DataTypes.STRING,
            allowNull: true,
            isAlpha: true
        },
        customer: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            isIn: [["WIP", "DELAYED", "COMPLETE", "TRANSIT"]]
        }
    });
    PO.associate = function(models){
        PO.hasMany(models.SO, {
            foreignKey: "purchaseOrder",
            sourceKey: "purchaseOrder"
        });
    };
    return PO;
};
