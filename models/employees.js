module.exports = function(sequelize, DataTypes) {
    const Employee = sequelize.define("Employee", {
        name: DataTypes.STRING,
        id: DataTypes.INT
        
    });

    return Employee;
};