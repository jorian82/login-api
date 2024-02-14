const { authJwt } = require("../middleware");
const controller = require("../controllers/controller.pokemon");
const express = require('express');
const router = express.Router();

// module.exports = function(app) {
router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get(
    '/pokemon',
    controller.findAll
);

router.get(
    '/pokemon/filter/:q',
    controller.filter
);

router.get(
    '/pokemon/details/:name',
    controller.details
)

router.get(
    '/pokemon/catalog/names',
    controller.findNames
)

router.get(
    '/pokemon/catalog',
    controller.getCatalog
)

router.get(
    '/pokemon/favorites/:username',
    [authJwt.verifyToken],
    controller.findFavs
)

router.get(
    '/pokemon/favorites/:username/:pokemon',
    controller.checkFavs
)

router.post(
    '/pokemon/favorites',
    [authJwt.verifyToken],
    controller.markFavorites
)

module.exports = router;
