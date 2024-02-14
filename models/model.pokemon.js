const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    return sequelize.define('pokemon', {
        name: {
            type: Sequelize.STRING
        },
        sprite: {
            type: Sequelize.TEXT
        },
        types: {
            type: Sequelize.TEXT
        },
        abilities: {
            type: Sequelize.TEXT
        },
        weight: {
            type: Sequelize.INTEGER
        },
        height: {
            type: Sequelize.INTEGER
        }
    });
}