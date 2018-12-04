module.exports = function(sequelize, DataTypes) {
    const Employee = sequelize.define("Employee", {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        id: DataTypes.INT,
        type: DataTypes.STRING
    });

    return Employee;
};