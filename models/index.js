// SQLite configuration
const dbConfig = require("../config/db.config.postgres");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    '',
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
    }
)

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//DB table definition
db.users = require('./model.user')(sequelize, Sequelize);
db.roles = require('./model.role')(sequelize, Sequelize);
db.refreshToken = require('./model.refreshToken')(sequelize, Sequelize);

// DB tables relationships
db.roles.belongsToMany(db.users, {
    through: 'users_roles',
    foreignKey: 'roleId',
    otherKey: 'userId'
});
db.users.belongsToMany(db.roles, {
    through: 'users_roles',
    foreignKey: 'userId',
    otherKey: 'roleId'
});
db.refreshToken.belongsTo(db.users, {
    foreignKey: 'userId',
    targetKey: 'id'
});
db.users.hasOne(db.refreshToken, {
    foreignKey: 'userId',
    targetKey: 'id'
});
db.ROLES = ['user','admin','creator'];

//DB object export
module.exports = db;
