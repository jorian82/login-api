const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    return sequelize.define('favorites', {
        pokemon: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        }
    });
}