const User = require('../models/user.model');
const DebtItem = require('../models/debtItem.model');


exports.addDebt = async (req,res) => {
    const email = req.email;
    const debt = req.body.debt;
    console.log('----> addDebt (udebtser.controller 4)', debt)
    console.log('---> addDebt email ----> ', email)
    let dbUser = null;
    let debtItem = null;
    try {
        dbUser = await User.findOne({ email });
        debt.user = dbUser._id;
        // console.log('----> addDebt (debt.controller 12) dbUser:', dbUser)
        if (dbUser) {
            // first try findOneAndUpdate
            try {
                debtItem = await DebtItem.findOne({ debtId: debt.debtId });
                if (!debtItem) {
                    // if not found, try create new DebtItem
                    try {
                        const createdDebt = await new DebtItem(debt).save();
                        console.log("----> addDebt (debt.controller 23) createdDebt with updates:", createdDebt);
                        res.status(200).json(createdDebt);
                    } catch (err) {
                        console.log('----x addDebt new User (debt.controller 26):', err)
                        res.status(200).json({error: "dB access failed"})
                    }
                }
            } catch (err) {
                console.log('----x addDebt new User (debt.controller 31):', err)
                res.status(200).json({error: "dB access failed"})
            }
        } else {
            console.log('----x addDebt findOne (debt.controller 35) NO dbUser!')
            res.status(200).json({error: "dB access failed"})
        }
    } catch (err) {
        console.log('----x addDebt findOne (debt.controller 36):', err)
        res.status(200).json({error: "dB access failed"})
    }

}

exports.getDebts = async (req, res) => {
    
    try {
        const user = await User.findOne({ email: req.email });
        if (user) {
            try {
                const debtItems = await DebtItem.find({ user: user._id });
                if (debtItems) {
                    console.log('----> getDebts debtItems (debt.controller 53):', debtItems)
                    res.status(200).json(debtItems);
                } else {
                    console.log('----x getDebts  DebtItem.find (debt.controller 58) NO DEBTS for User:', user._id)
                    res.status(200).json({error: "NO DEBTS FOUND"})
                }

            } catch (err) {
                console.log('----x getDebts  DebtItem.find (debt.controller 58):', err)
                res.status(200).json({error: "dB access failed"})
            }
        }
    } catch (err) {
        console.log('----x getDebts User.findOne (debt.controller 59):', err)
        res.status(200).json({error: "dB access failed"})
    }
        
}