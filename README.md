# Pokedex-API
Project created with Node 20 LTS, Express 4, sqlite3, sequelize v6 and bcryptjs v2 to encrypt user passwords 

## App Structure
The app is divided into several folders that have their own functionality

- Config: DB and authentication config files, currently has one config to connect to a local MySQL instance and one config file to connect to a sqlite3 DB
- Controllers: All the code to connect to the database and the external APIs
- databases: folder that stores the sqlite3 database that the API uses to store users and favorites
- middleware: Holds the jwt and verify signup modules
- models: mappings used to create DB tables and to pass data to the API
- routes: All files that define the API URLs, their protocols and their validations for registered users
- views: holds the web app for deployment to DEV, QA and Prod environments

# Executing the API
This API must be executed before using the web app for developer mode. Like the UI app this API also has 2 ways to be 
used

The API generates by default an admin user and a creator user, other regular users can be added by the register page

#### Admin
- username: defaultAdmin
- password: default.admin

#### Creator
- username: defaultCreator
- password: default.creator

## Developer mode instructions
- Clone the repo project
- Navigate to the API folder
- Execute 'npm install' (only once to load the libraries)
- Execute 'node index.js' to run the API in port 8080


## Standalone instructions
This mode is the default mode, is stored in the repo as standalone app

- Clone the repo project
- Navigate to the API folder
- Execute 'npm install' (Only once to load the libraries)
- Copy content of pokedex-web/dist folder to views folder to run both apps as one
- Execute 'node index.js' to run both apps as one
- Browse to http://localhost:8080 to see the pokedex-web main page

# API paths listing

### Pokedex paths
All pokedex paths are in the controller.pokemon file

#### path: 'http://{server}:{port}/api/pokemon/filter/:q'
 - code executed:    filter function
 - params: :q - text that matches a full or partial pokemon name
 - method: GET

#### path: 'http://{server}:{port}/api/pokemon/details/:name'
 - description: retrieves 2 relevant details from the pokeapi for the pokemon requested
 - code executed: details function
 - params: :name - pokemon name to be retrieved from the pokeapi
 - method: GET
 - returns: string array

#### path: 'http://{server}:{port}/api/pokemon/catalog/names',
 - description: gets the pokemon names from the local database
 - code executed: findNames function
 - params: no params needed
 - method: GET
 - returns: string array with all pokemons in local database

#### path  'http://{server}:{port}/api/pokemon/catalog',
 - description: retrieves the pokemon catalog from the local DB
 - code executed: getCatalog function
 - params: not needed
 - method GET
 - returns: array of pokemon names and their pokeapi url to get the search result

#### path  'http://{server}:{port}/api/pokemon/favorites/:username',
 - description: retrieves the list of favorite pokemons for the username passed 
 - only available to registered users
 - code executed: findFavs function
 - params: :username - the username of the user we want to retrieve the favorite pokemons
 - method: GET

#### path  'http://{server}:{port}/api/pokemon/favorites/:username/:pokemon',
 - description: checks if the selected pokemon is marked as favorite for the user selected
 - code executed: checkFavs function
 - params: :username, :pokemon - pair to check if they are marked as favorites
 - method: GET
 - return: boolean depending if the pokemon is favorite or not for the user

#### path  'http://{server}:{port}/api/pokemon/favorites',
 - description: marks/unmarks the selected pokemon as favorite for the user 
 - Only available to registered users
 - code executed: markFavorites function
 - body: json pair {username,pokemon} to be toggled
 - method POST
 - return: string notifying that the pokemon was marked or unmarked as favorite


### User paths

#### path 'http://{server}:{port}/api/user/test/user',
- description: checks that the user is registered for the auth guard
- only available to registered users
- code: userBoard function in user controller
- params: not needed
- method: GET
- return: string stating that the user has access or an error if the token has expired

### Auth paths

#### path 'http://{server}:{port}/api/auth/signup',
- description: registers a new user
- verifies that the email is unique and the roles being assigned exist
- code: signup function in auth controller
- body: json object {username,password,email}
- method: POST
- returns: user info {id, username, email, roles}

#### path 'http://{server}:{port}/api/auth/signin'
 - description: log in the user in the body
 - code: signin function in auth controller
 - body: json pair {username,password}
 - method: POST
 - return: json object with user info: {username, email, roles, the access token and the refresh token}
