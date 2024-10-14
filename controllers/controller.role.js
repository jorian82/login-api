const db = require('../models');
const Role = db.roles;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    Role.create({
        name: req.body.name
    })
    .then( rol => {
        res.status(200).send({ message: 'rol created succesfully' });
    })
    .catch( err => {
        res.status(500).send({ message: err.message });
    })

};
exports.findAll = (req, res) => {
    Role.findAll()
    .then( roles => {
        if(!roles) {
            res.status(404).send({ message: 'No roles found' });
        }
        res.status(200).send({ data: roles });
    })
    .catch( err => {
        res.status(500).send({ message: err.message });
    })

};
exports.findOne = (req, res) => {};
exports.update = (req, res) => {};
exports.delete = (req, res) => {};
exports.deleteAll = (req, res) => {};
exports.findAllPublished = (req, res) => {};
