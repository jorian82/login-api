const db = require('../models');
const Pokemon = db.pokemons;
const Catalog = db.catalog;
const Favorites = db.favorites;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const pkm = req.body;
    Pokemon.findAndCountAll({
        where: {
            name: pkm.name
        }
    }).then( resp => {
        if(resp.count<1){
            Pokemon.create({
                name: pkm.name,
                sprite: pkm.sprite,
                types: pkm.types,
                abilities: pkm.abilities,
                height: pkm.height,
                weight: pkm.weight
            }).then( resp => {
                res.json({
                        message: 'success',
                        data: resp
                });
            }).catch( error => {
                res.json({
                    message: 'error',
                    data: error
                });
            })
        } else {
            res.json({
                message: 'success',
                data: resp.rows
            });
        }
    }).catch( error => {
        res.json({
            message: 'error',
            data: error
        })
    });
};
exports.findNames = async (req, res) => {
    const catalog = await Catalog.findAll()
    if(catalog.length>0){
        res.json({
            message: 'success',
            data: catalog.map( item => item.name )
        })
    } else {
        res.json({
           message: 'success',
           data: getAndLoadCatalog().map( item => item.name )
        });
    }
};
exports.details = async (req, res) => {
    try {
        const name = req.params.name;
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
        const data = await resp.json();

        res.json({
            message: 'success',
            data: data.flavor_text_entries
        })
    } catch (e) {
        res.json({
            message: 'success',
            data: []
        });
    }
}
exports.getCatalog = async (req, res) => {
    try {
        const catalog = await Catalog.findAll()
        if (catalog.length > 0) {
            res.json({
                message: 'success',
                data: catalog
            })
        } else {
            res.json({
                message: 'success',
                data: getAndLoadCatalog()
            });
        }
    } catch (e) { }
}
exports.markFavorites = async (req, res) => {
    try {
        const fav = await Favorites.findAll({
            where: {
                [Op.and]: [
                    {pokemon: req.body.pokemon},
                    {username: req.body.username}
                ]
            }
        })
        if (fav > 0) {
            try {
                await Favorites.destroy({
                    where: {
                        [Op.and]: [
                            {pokemon: req.body.pokemon},
                            {username: req.body.username}
                        ]
                    }
                });
                res.json({
                    message: 'success',
                    data: {message: 'Favorite deleted'}
                });
            } catch (e) {

            }
        } else {
            try {
                await Favorites.create({
                    pokemon: req.body.pokemon,
                    username: req.body.username
                })
                res.json({
                    message: 'success',
                    data: {message: 'Favorite added'}
                });
            } catch (e) {

            }
        }
    } catch (e) {
        res.json({
            message:'error',
            data: { message: 'error' }
        });
    }

}
exports.findAll = (req, res) => {
    Pokemon.findAll()
        .then( pokemones => {
            res.json({
                message: 'success',
                data: pokemones
            })
        })
};
exports.update = (req, res) => {};
exports.delete = (req, res) => {};
exports.deleteAll = (req, res) => {};
exports.findFavs = async (req, res) => {
    try {
        console.log(req.params);
        const data = await Favorites.findAll({
            where: {
                username: req.params.username
            }
        });

        let list = [];
        for (let i = 0; i < data.length; i++) {
            list.push(await getPokemonData('https://pokeapi.co/api/v2/pokemon/' + data[i].pokemon));
        }
        res.json({
            message: 'success',
            data: list
        })
    } catch( error ) {
        res.status(404).json({
            message: 'Error retrieving favorites',
            data: error
        })
    }
};
exports.checkFavs = async (req, res) => {
    try {
        const fav = await Favorites.findAll({
            where: {
                [Op.and]: [
                    {pokemon: req.body.pokemon},
                    {username: req.body.username}
                ]
            }
        });
        if (fav.length > 0) {
            res.json({
                message: 'success',
                data: {marked: true}
            });
        } else {
            res.json({
                message: 'success',
                data: {marked: false}
            });
        }
    } catch (error) {
        res.json({
            message: 'error',
            data: { marked: false }
        });
    }
}
exports.filter = async (req, res) => {
    let pokemons = []; //list.map(item => getPokemonData(item.url))

    try {
        const list = await Catalog.findAll({
            where: {
                name: {
                    [Op.substring]: req.params.q
                }
            }
        });

        for (let i = 0; i < list.length; i++) {
            pokemons.push(await getPokemonData(list[i].url));
        }
    } catch(e) {}

    res.json({
        message: 'success',
        data: pokemons
    });
};

const getPokemonData = async (url) => {
    try {
        const resp = await fetch(url);
        const data = await resp.json();
        return {
            name: data.name,
            sprite: data.sprites,//.other['official-artwork'].front_default,
            types: data.types.map(elem => elem.type.name),
            abilities: data.abilities.map(elem => elem.ability),
            height: data.height,
            weight: data.weight
        };
    } catch (e) {
        return {};
    }
}

const getAndLoadCatalog = async () => {
    try {
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);
        const catalog = await resp.json();
        catalog.results.forEach((pkm, index) => {
            Catalog.create({
                name: pkm.name,
                url: pkm.url
            })
        })
        return catalog;
    } catch (e) {return []}
}

exports.getAndLoadCatalog = () => {
    getAndLoadCatalog().then().catch();
}
