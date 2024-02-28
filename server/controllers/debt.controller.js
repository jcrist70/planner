const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const { v4: uuid } = require('uuid');

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

  const daysOfWeek = [
    {index: 0, label: "#"},
    {index: 1, label: "Monday"},
    {index: 2, label: "Tuesday"},
    {index: 3, label: "Wednesday"},
    {index: 4, label: "Thursday"},
    {index: 5, label: "Friday"},
    {index: 6, label: "Saturday"},
    {index: 7, label: "Sunday"},
  ];

  // Add to an existing dar OR create a day to add it to
  // AND, if created a day, add that day to its week.  Creating
  // the week if it does not exist AND adding the week to its month.
  // Creating the month if it does not exist AND adding it to its year
  // creating the year if it sdoes not exist.
exports.addDebt = async (req,res) => {
    const email = req.email;
    const debt = req.body.debt;
    console.log('----> addDebt (debt.controller 39) debt:', debt)
    console.log('---> addDebt (debt.controller 40) email:', email)
    const dateArr = debt.startDate.split('-');
    let month = parseInt(dateArr[0]) - 1;
    const day = parseInt(dateArr[1]);
    const year = parseInt(dateArr[2]);
    let days = new Date(year, month+1, 0).getDate();
    console.log('days:', days) 

    debt.day = day;
    debt.month = month+1;
    debt.year = year;
    
    let date = new Date(year, month, day);
    date.setHours(date.getHours() - 5);
    
    // date = date.split('T')[0];
    // date = date.toLocaleDateString();
    // date = date.getFullYear()+'-'+(date.getMonth())+'-'+date.getDate(); 
    let dateNext = new Date(year, month, day+1);

    month += 1;
    const first = new Date(date.getFullYear(), date.getMonth(), 1);
    console.log('first:', first) 
    const currentWeekNumber = date.getWeek();
    console.log('---> addDebt (debt.controller 57) dateArr:', month, day, year, date, dateNext)
    console.log('currentWeekNumber:', currentWeekNumber)

    let dayLabel = new Date(year + "-" + month + "-01").getDay();
    dayLabel += 1;

    let dbDay = null;
    let dbWeek = null;
    let dbMonth = null;
    let dbYear = null;
    let dbUser = null;
    let debtItem = null;
    let existing = null;
    try {

        dbUser = await User.findOne({ email });
        debt.user = dbUser._id;
        // console.log('----> addDebt (debt.controller 12) dbUser:', dbUser)
        if (dbUser) {
            // first try findOneAndUpdate
            try {
                console.log('type, price, item', day, month, year, debt.type, debt.price, debt.item)
                debtItem = await DebtItem.findOneAndUpdate(
                    { day, month, year, type: debt.type, item: debt.item },
                    { type: debt.type, price: debt.price, item: debt.item },
                    { new: true }
                    ).exec();
                // type: debt.type, price: debt.price, item: debt.item
                console.log("----> DebtItem.findOne (debt.controller 82) debtItem:", debtItem);
                // if (!debtItem || (debtItem && debtItem.debtId !== debt.debtId)) {
                if (!debtItem) {
                    // if not found, try create new DebtItem
                    try {
                        const createdDebt = await new DebtItem(debt).save();
                        console.log("----> addDebt (debt.controller 83) createdDebt with updates:", createdDebt);
                        
                        // dbDay = await Day.find({ date: {$gt: date, $lt: dateNext} });
                        dbDay = await Day.findOneAndUpdate(
                            // { date: {$gt: date, $lt: dateNext} },
                            { number: day, month, year },
                            {   
                                $push: { debtItems: createdDebt._id },
                                $inc: { accumulatedDebt: parseInt(debt.price) }
                            },
                            { new: true }
                        ).exec();
                        console.log('---> addDebt (debt.controller 98) dbDay:', dbDay)
                        if (!dbDay) {       
                        // if (dbDay.length === 0) {
                            const newDay = {   
                                dayId: uuid(),
                                date,
                                dayName: daysOfWeek[dayLabel].label,
                                number: day,
                                month,
                                year,
                                debtItems: [createdDebt._id],
                                creditItems: [],
                                accumulatedDebt: parseInt(debt.price),
                                accumulatedCredit: null,
                                targets: [],
                                holders: [],
                            }
                            try {
                                const createdDay = await new Day(newDay).save();
                                console.log("!!! Day CREATED", createdDay);
                                dbDay = createdDay;

                                // dbWeek = await Week.find({ year, number: currentWeekNumber });
                                dbWeek = await Week.findOneAndUpdate(
                                    { year, number: currentWeekNumber },
                                    {   
                                        $push: { days: dbDay._id },
                                        $inc: { accumulatedDebt: parseInt(debt.price) }
                                    },
                                    { new: true }
                                ).exec();

                                console.log('---> addDebt (debt.controller 124) dbWeek:', dbWeek)
                                
                                if (!dbWeek) {
                                    const newWeek = {  
                                        weekId: uuid(),
                                        year,
                                        number: currentWeekNumber,
                                        accumulatedDebt: parseInt(debt.price),
                                        accumulatedCredit: 0,
                                        days: [dbDay._id],
                                        targets: [],
                                        holders: [],
                                    }
                                    const createdWeek = await new Week(newWeek).save();
                                    dbWeek = createdWeek;
                                    console.log("!!! Week CREATED", createdWeek);
                                } else {
                                    console.log('WEEK EXISTS, UPDATE!!')
                                }

                                // dbMonth = await Month.find({ year, number: month });
                                dbMonth = await Month.findOneAndUpdate(
                                    { year, number: month },
                                    {   
                                        $push: { weeks: dbWeek._id },
                                        $inc: { accumulatedDebt: parseInt(debt.price) }
                                    },
                                    { new: true }
                                ).exec();
                                // console.log('year, month, dayLabel, daysOfWeek[dayLabel],', year, month, dayLabel, daysOfWeek[dayLabel])
                                console.log('---> addDebt (debt.controller 154) dbMonth:', dbMonth)
                                
                                if (!dbMonth) {
                                    
                                    const newMonth = {
                                        monthId: uuid(),
                                        year: year,
                                        number: month,
                                        days: days,
                                        firstDay: daysOfWeek[dayLabel],
                                        accumulatedDebt: parseInt(debt.price),
                                        accumulatedCredit: 0,
                                        weeks: [dbWeek._id],
                                        targets: [],
                                        holders: [],
                                    }
                                    console.log('=--==-=-==-=->CREATE MONTH newMonth:', newMonth)

                                    const createdMonth = await new Month(newMonth).save();
                                    console.log("Month CREATED", createdMonth);
                                    dbMonth = createdMonth;
                                } else {
                                    console.log('MONTH EXISTS, UPDATE!!')
                                }

                                // dbYear = await Year.find({ number: year });
                                dbYear = await Year.findOneAndUpdate(
                                    { number: year.number },
                                    {   
                                        $push: { months: dbMonth._id },
                                        $inc: { accumulatedDebt: parseInt(debt.price) }
                                    },
                                    { new: true }
                                ).exec();
                                console.log('---> addDebt (debt.controller 188) dbYear:', year, dbYear)
                                
                                if (!dbYear) {
                                    console.log('CREATE YEAR!!')
                                    const newYear = {   
                                        yearId: uuid(),
                                        number: year,
                                        accumulatedDebt: parseInt(debt.price),
                                        accumulatedCredit: 0,
                                        months: [dbMonth._id],
                                        targets: [],
                                        holders: []
                                    }
                                    const createdYear = await new Year(newYear).save();
                                    console.log("Year CREATED", createdYear);
                                } else {
                                    console.log('YEAR EXISTS, UPDATE!!')
                                }
                                
                                

                            } catch (err) {
                                console.log('----x addDebt new (debt.ctrlr 210):', err);
                                // res.send({error: "dB access failed"})
                            }
                        } else {
                            console.log('----x addDebt find (debt.controller 214):')
                            // res.status(200).json({error: "dB access failed"})
                        }
                        
                        res.status(200).json(createdDebt);
                    } catch (err) {
                        console.log('---- addDebtDay EXISTS UPDATE (debt.controller 226):')
                        // res.status(200).json({msg: "UPDATE DAY"})
                    }
                } else {
                    console.log('DebtItem EXISTS, UPDATE!')
                }
            } catch (err) {
                console.log('----x addDebt (debt.controller 231):', err)
                // res.status(200).json({error: "dB access failed"})
            }
        } else {
            console.log('----x addDebt findOne (debt.controller 235) NO dbUser!')
            res.status(200).json({error: "dB access failed"})
        }

        
        
    } catch (err) {
        console.log('----x addDebt findOne (debt.controller 242):', err)
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