const { authJwt } = require("../middleware");
const controller = require("../controllers/controller.role");
const express = require('express');
const router = express.Router();

    router.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.post(
        '/roles',
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.create
    )

    router.get(
        '/roles',
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.findAll
    )

    module.exports = router;
