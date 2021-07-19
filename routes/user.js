const express = require('express');

const userController = require('../controller/user');
const expenseController = require('../controller/expense');

const authenticateMiddleware = require('../middleware/auth')

const router = express.Router();


router.post('/signup', userController.signup);

router.post('/login',userController.login);

router.post('/addexpense',authenticateMiddleware.authenticate, expenseController.addexpense);

router.get('/getexpenses',authenticateMiddleware.authenticate,expenseController.getexpenses);
router.delete('/deleteexpense/:expenseid', authenticateMiddleware.authenticate,expenseController.deleteexpense)

module.exports = router;