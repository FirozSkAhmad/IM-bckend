const Sequelize = require('sequelize')

const BillingModel = global.DATA.CONNECTION.mysql.define("products", {
    billing_id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    client_name: {
        type: Sequelize.DataTypes.STRING(200),
        allowNull: false
    },
    products: {
        type: Sequelize.DataTypes.JSON,
        allowNull: false
    },
    total_price: {
        type: Sequelize.DataTypes.STRING(200),
        allowNull: false
    },
    due_date: {
        type: Sequelize.DataTypes.STRING(200),
        allowNull: false,
        defaultValue: function () {
            // Calculate the default due date (15 days ahead of createdAt)
            const currentDate = new Date();
            const dueDate = new Date(currentDate.setDate(currentDate.getDate() + 15));

            // Format the due date as a string (adjust as needed)
            return dueDate.toISOString().split('T')[0];
        }
    },
    createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: "billing"
})

module.exports = BillingModel