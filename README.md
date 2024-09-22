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
- views: holds the default welcome landing page when executing the API 


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


# API paths listing

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
