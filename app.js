const path = require('path');

const express = require('express');
var cors = require('cors');
const sequelize = require('./util/database');
const User = require('./models/users');

const userRoutes = require('./routes/user')

const app = express();

app.use(cors());

app.use(express.json());  //this is for handling jsons

app.use('/user', userRoutes)

// User.hasMany(Expense);
// Expense.belongsTo(User);


sequelize.sync()
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })
