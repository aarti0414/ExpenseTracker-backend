const Expense = require('../models/expenses');

exports.addexpense = (req, res) => {
    const { expenseAmount, description, category } = req.body;
    req.user.createExpense({ expenseAmount, description, category }).then(expense => {
        return res.status(201).json({expense, success: true } );
    }).catch(err => {
        return res.status(403).json({success : false, error: err})
    })
}

exports.getexpenses = (req, res)=> {

    req.user.getExpenses().then(expenses => {
        return res.status(200).json({expenses, success: true})
    })
    .catch(err => {
        return res.status(402).json({ error: err, success: false})
    })
}

exports.deleteexpense = (req, res) => {
    const expenseid = req.params.expenseid;
    Expense.destroy({where: { id: expenseid }}).then(() => {
        return res.status(204).json({ success: true, message: "Deleted Successfuly"})
    }).catch(err => {
        console.log(err);
        return res.status(403).json({ success: true, message: "Failed"})
    })
}
