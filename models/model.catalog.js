const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    return sequelize.define('catalog', {
        name: {
            type: Sequelize.STRING
        },
        url: {
            type: Sequelize.TEXT
        }
    });
}