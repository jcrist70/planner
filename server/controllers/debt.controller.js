const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const Year = require('../models/year.model');
const Month = require('../models/month.model');
const Week = require('../models/week.model');
const Day = require('../models/day.model');

const User = require('../models/user.model');
const DebtItem = require('../models/debtItem.model');

Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    var today = new Date(this.getFullYear(),this.getMonth(),this.getDate());
    var dayOfYear = ((today - onejan + 86400000)/86400000);
    return Math.ceil(dayOfYear/7)
  };

  // Add to an existing dar OR create a day to add it to
  // AND, if created a day, add that day to its week.  Creating
  // the week if it does not exist AND adding the week to its month.
  // Creating the month if it does not exist AND adding it to its year
  // creating the year if it sdoes not exist.
exports.addDebt = async (req,res) => {
    const email = req.email;
    const debt = req.body.debt;
    console.log('----> addDebt (debt.controller 15) debt:', debt)
    console.log('---> addDebt (debt.controller 16) email:', email)
    const dateArr = debt.startDate.split('-');
    const month = parseInt(dateArr[0]) - 1;
    const day = parseInt(dateArr[1]);
    const year = parseInt(dateArr[2]);
    let date = new Date(year, month, day);
    // date = date.split('T')[0];
    // date = date.toLocaleDateString();
    // date = date.getFullYear()+'-'+(date.getMonth())+'-'+date.getDate(); 
    const dateNext = new Date(year, month, day+1);
    const first = new Date(date.getFullYear(), date.getMonth(), 1)
    console.log('first:', first) 
    const currentWeekNumber = first.getWeek();
    console.log('---> addDebt (debt.controller 18) dateArr:', month, day, year, date, dateNext)
    console.log('currentWeekNumber:', currentWeekNumber)
    let dbDay = null;
    let dbWeek = null;
    let dbMonth = null;
    let dbYear = null;
    let dbUser = null;
    let debtItem = null;
    try {

        dbDay = await Day.find({ date: {$gt: date, $lt: dateNext} });
        // dbDay = await Day.find({ date });
        console.log('---> addDebt (debt.controller 53) dbDay:', dbDay)
        dbWeek = await Week.find({ year, number: currentWeekNumber });
        console.log('---> addDebt (debt.controller 55) dbWeek:', dbWeek)
        dbMonth = await Month.find({ year, number: month });
        console.log('---> addDebt (debt.controller 57) dbMonth:', dbWeek)
        dbYear = await Year.find({ number: year });
        console.log('---> addDebt (debt.controller 59) dbYear:', dbWeek)

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