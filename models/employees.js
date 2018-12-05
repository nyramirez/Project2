module.exports = function(sequelize, DataTypes) {
    const Employee = sequelize.define("Employee", {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        }
    });
    return Employee;
};