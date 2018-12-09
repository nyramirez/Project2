const bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        // The username cannot be null
        username: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
            //validate: {
            // isEmail: false
            //}
        },
        // The password cannot be null
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        employeeType: {
            type: DataTypes.STRING,
            allowNull: false
            // validate: {
            //     isIN: [["Manager", "Clerk", "Forklift"]]
            // }
        }
    });
    // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    User.hook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(
            user.password,
            bcrypt.genSaltSync(10),
            null
        );
    });
    return User;
};
