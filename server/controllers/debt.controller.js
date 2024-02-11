const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

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
                console.log('----> getDebts (debt.controller 52) user._id:', user._id)
                // const debtItems = await DebtItem.find({ user: user._id });
                // const debtItems = await DebtItem.find({ users: {
                //     $elemMatch: {
                //       _id: user._id
                //     }
                //   } });
                //   const debtItems = await DebtItem.find({
                //     users: {
                //     $elemMatch: {
                //     _id: "65c0150fdb7f315fe9b2797f"
                //     }
                // }
                // })
                // { 'users': mongoose.Types.ObjectId('65c0150fdb7f315fe9b2797f') }
                // { users: mongoose.ObjectId("65c0150fdb7f315fe9b2797f") }
                // const debtItems = await DebtItem.find({ 'users': mongoose.Types.ObjectId('65c0150fdb7f315fe9b2797f') }, function (err, results) { 
                //     console.log(results); 
                // });
                // const debtItems = await DebtItem.find({ 'users': '65c0150fdb7f315fe9b2797f' });
                // let debtItems = await DebtItem.find().exec();
                // debtItems = debtItems.map((d) => {
                //     return d.users.includes(user._id) && d;
                // })
                const debtItems = await DebtItem.find( { "users": new mongoose.Types.ObjectId("65c0150fdb7f315fe9b2797f") } ).exec();
                
                if (debtItems.length > 0 && !debtItems.every(element => element === false)) {
                    console.log('----> getDebts debtItems (debt.controller 61):', debtItems)
                    res.status(200).json(debtItems);
                } else {
                    console.log('----x getDebts  DebtItem.find (debt.controller 64) NO DEBTS for User:', user._id)
                    res.status(200).json({error: "NO DEBTS FOUND"})
                }

            } catch (err) {
                console.log('----x getDebts  DebtItem.find (debt.controller 69):', err)
                res.status(200).json({error: "dB access failed"})
            }
        }
    } catch (err) {
        console.log('----x getDebts User.findOne (debt.controller 74):', err)
        res.status(200).json({error: "dB access failed"})
    }
        
}