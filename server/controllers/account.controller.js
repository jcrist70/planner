const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const User = require('../models/user.model');
const Account = require('../models/account.model');


exports.addAccount = async (req,res) => {
    const email = req.email;
    const account = req.body.account;
    console.log('----> addAccount (account.controller 11)', account)
    console.log('---> addAccount email ----> ', email)
    let dbUser = null;
    let dbAccount = null;
    try {
        dbUser = await User.findOne({ email });
        let holders = [...account.holders];
        holders.push(dbUser._id);
        account.holders = holders;
        
        // console.log('----> addDebt (debt.controller 12) dbUser:', dbUser)
        if (dbUser) {
            // first try findOneAndUpdate
            try {
                dbAccount = await Account.findOne({ accountId: account.accountId });
                if (!dbAccount) {
                    // if not found, try create new DebtItem
                    try {
                        const createdAccount = await new Account(account).save();
                        console.log("----> addAccount (account.controller 27) createdAccount with updates:", createdAccount);
                        res.status(200).json(createdAccount);
                    } catch (err) {
                        console.log('----x addAccount new User (account.controller 30):', err)
                        res.status(200).json({error: "dB access failed"})
                    }
                }
            } catch (err) {
                console.log('----x addAccount new Account (account.controller 35):', err)
                res.status(200).json({error: "dB access failed"})
            }
        } else {
            console.log('----x addAccount findOne (account.controller 39) NO dbUser!')
            res.status(200).json({error: "dB access failed"})
        }
    } catch (err) {
        console.log('----x addAccount findOne (account.controller 43):', err)
        res.status(200).json({error: "dB access failed"})
    }

}

exports.getAccounts = async (req, res) => {
    
    try {
        const user = await User.findOne({ email: req.email });
        if (user) {
            try {
                console.log('----> getAccounts (account.controller 55) user._id:', user._id)
                const accounts = await Account.find( { "holders": new mongoose.Types.ObjectId(user._id) } ).exec();
                
                if (accounts.length > 0 && !accounts.every(element => element === false)) {
                    console.log('----> getAccounts accounts (account.controller 59):', accounts)
                    res.status(200).json(accounts);
                } else {
                    console.log('----x getAccounts  Account.find (account.controller 62) NO Accounts for User:', user._id)
                    res.status(200).json({error: "NO ACCOUNTS FOUND"})
                }

            } catch (err) {
                console.log('----x getAccounts  Accounts.find (account.controller 67):', err)
                res.status(200).json({error: "dB access failed"})
            }
        }
    } catch (err) {
        console.log('----x getAccounts User.findOne (account.controller 72):', err)
        res.status(200).json({error: "dB access failed"})
    }
        
}