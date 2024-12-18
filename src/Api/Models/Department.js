const { DataTypes } = require('sequelize');
const { sequelize } = require('../../Config/Database/db.config');

const departmentAttribute = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    head_of_department: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contact_number: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    created_by: {
        type: DataTypes.STRING,
        allowNull: false
    },
    updated_by: {
        type: DataTypes.STRING,
        allowNull: false
    }
}

const Department = sequelize.MAIN_DB_NAME.define('Department', departmentAttribute,
    {
        tableName: 'tbl_departments',
        timestamps: true
    });

module.exports = Department;


