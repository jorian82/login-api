const express = require("express");
const cors = require("cors");
const path = require('path');
const app = express();
const { v4: uuidv4 } = require('uuid');
var bcrypt = require("bcryptjs");

const corsOptions = {
  origin: "http://localhost:4200"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'/views')));
app.use('/static',express.static(path.join(__dirname,'attachments')));

const  db = require('./models');
const Roles = db.roles;
const Users = db.users;

//dev environment use {force: true} as param of sync to drop DB and rebuild
db.sequelize.sync()
  .then(() => {
    console.log("Syncing db.");
    initialize();
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
    // console.log(err);
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to login api" });
});

// routes
const auth = require('./routes/auth.routes');//(app);
const user = require('./routes/user.routes');

app.use('/api', auth);
app.use('/api', user);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initialize() {
  addDefaultUsers();
}

const addDefaultUsers = () => {
  Roles.findAndCountAll()
      .then(({count,rows}) => {
        if(count<1) {
          Roles.create({ id: 1, name: "user" }).then(role => console.log(role));
          Roles.create({ id: 2, name: "creator" }).then(role => console.log(role));
          Roles.create({ id: 3, name: "admin" }).then(role => console.log(role));

          Users.create({ id: 1, username: 'defaultAdmin', firstName: 'Default', lastName: 'Admin', email: 'admin@example.com', password: bcrypt.hashSync('default.admin', 8) })
              .then( user => { user.setRoles([3]); })
              .catch( err => { console.log('error adding user: ',err); });
          Users.create({ id: 2, username: 'defaultCreator', firstName: 'Default', lastName: 'Creator', email: 'creator@example.com', password: bcrypt.hashSync('default.creator', 8) })
              .then( user => { user.setRoles([2]); })
              .catch( err => { console.log('error adding user: ',err); });
          console.log("Default users added successfully...");
        } else {
          console.log("Default Roles and Users are already loaded...")
        }
      })
      .catch( error => console.log("Error counting roles: ", error)
      );
}
