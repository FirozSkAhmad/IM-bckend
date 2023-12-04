const Sequelize = require('sequelize')

const ProductsModel = global.DATA.CONNECTION.mysql.define("products", {
    product_id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    part_no: {
        type: Sequelize.DataTypes.STRING(200),
        allowNull: false
    },
    description: {
        type: Sequelize.DataTypes.STRING(200),
        allowNull: true
    },
    MRP: {
        type: Sequelize.DataTypes.STRING(200),
        allowNull: true
    },
    std_pkg: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false
    },
    master_pkg: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false
    },
    qty: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: true,
        defaultValue: '50'
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
    tableName: "products"
})

module.exports = ProductsModel