module.exports = {
    HOST: "localhost",
    USER: "jorian",
    DB: "loginapi",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    URL: "postgres://loginapi::5432/loginapi"
};
