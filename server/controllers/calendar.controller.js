const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const User = require('../models/user.model');
const Year = require('../models/creditItem.model');
const Month = require('../models/month.model');
const Week = require('../models/week.model');
const Day = require('../models/day.model');
// const CreditItem = require('../models/creditItem.model');
// const DebtItem = require('../models/debtItem.model');



exports.updateYear = async (req,res) => {
    const year = req.body.year;
    console.log('---- updateYear (calendar.ctrlr 13):', year)
    
    let existing = null;
    try {
        existing = await Year.findOneAndUpdate(
            { yearId: year.yearId },
            {   
                number: year.number,
                accumulatedDebt: year.accumulatedDebt,
                accumulatedCredit: year.accumulatedCredit,
                months: year.months,
                targets: year.targets,
                holders: year.holders
            },
            { new: true }
        ).exec();
        console.log('-----> existing:', existing)
        if (existing) {
            res.json(existing);
        } else {
            try {
                const createdYear = await new Year(year).save();
                console.log("Year CREATED", createdYear);
                res.json(createdYear);
            } catch (err) {
                console.log('----x updateYear new Year (calendar.ctrlr 58):', err);
                res.send({error: "dB access failed"})
            }
        } 
    } catch (err) {
        console.log('----x updateYear findOneAndUpdate (calendar.ctrlr 42):', err);
        res.send({error: "dB access failed"})
    } 
  };

exports.updateMonth = async (req,res) => {
    const month = req.body.month;
    console.log('---- updateMonth (calendar.ctrlr 50):', month)
    
    let existing = null;
    try {
        existing = await Month.findOneAndUpdate(
            { monthId: month.monthId },
            {   
                number: month.number,
                days: month.days,
                firstDay: month.firstDay,
                accumulatedDebt: month.accumulatedDebt,
                accumulatedCredit: month.taraccumulatedCreditgets,
                weeks: month.weeks,
                targets: month.targets,
                holders: month.holders,
            },
            { new: true }
        ).exec();
        console.log('-----> existing:', existing)
        if (existing) {
            res.json(existing);
        } else {
            try {
                const createdMonth = await new Month(month).save();
                console.log("Month CREATED", createdMonth);
                res.json(createdMonth);
            } catch (err) {
                console.log('----x updateMonth new Month (calendar.ctrlr 77):', err);
                res.send({error: "dB access failed"})
            }
        } 
    } catch (err) {
        console.log('----x updateMonth findOneAndUpdate (calendar.ctrlr 82):', err);
        res.send({error: "dB access failed"})
    } 
  };
  
exports.updateWeek = async (req,res) => {
    const week = req.body.week;
    console.log('---- updateWeek (calendar.ctrlr 89):', week)
    
    let existing = null;
    try {
        existing = await Week.findOneAndUpdate(
            { weekId: week.weekId },
            {   
                number: week.number,
                accumulatedDebt: week.accumulatedDebt,
                accumulatedCredit: week.taraccumulatedCreditgets,
                days: week.days,
                targets: week.targets,
                holders: week.holders,
            },
            { new: true }
        ).exec();
        console.log('-----> existing:', existing)
        if (existing) {
            res.json(existing);
        } else {
            try {
                const createdWeek = await new Week(week).save();
                console.log("Week CREATED", createdWeek);
                res.json(createdWeek);
            } catch (err) {
                console.log('----x updateWeek new Week (chapterGroup.ctrlr 116):', err);
                res.send({error: "dB access failed"})
            }
        } 
    } catch (err) {
        console.log('----x updateWeek findOneAndUpdate (chapterGroup.ctrlr 119):', err);
        res.send({error: "dB access failed"})
    } 
  };

exports.getDay = async (req, res) => {
    console.log('----> getDay (calendar.controller 125)', req.body.date)
    try {
        const day = await Day.findOne({ date: req.body.date })
        .populate("debtItems", "type startDate endDate item price cycle frequency supplier account")
        .populate("creditItems", "type date item amount cycle frequency source account user")
        .populate("holders", "name email family accounts role region")
        .exec();
        console.log('----> day:', day)

        if (day) {
            res.status(200).json(day);
        } else {
            console.log('----x getDay  Day.find (calendar.controller 137) NO DAY for date:', req.body.date)
            res.status(200).json({error: "NO DAY FOUND"})
        }

    } catch (err) {
        console.log('----x getDay Day.findOne (calendar.controller 142):', err)
        res.status(200).json({error: "dB access failed"})
    }
        
}

exports.updateDay = async (req,res) => {
    const day = req.body.day;
    console.log('---- updateDay (calendar.ctrlr 126):', day)
    
    let existing = null;
    try {
        existing = await Day.findOneAndUpdate(
            { dayId: day.dayId },
            {   
                date: day.date,
                dayName: day.dayName,
                number: day.number,
                debtItems: day.debts,
                creditItems: day.credits,
                accumulatedDebt: day.accumulatedDebt,
                accumulatedCredit: day.taraccumulatedCreditgets,
                targets: day.targets,
                holders: day.holders,
            },
            { new: true }
        ).exec();
        console.log('-----> existing:', existing)
        if (existing) {
            res.json(existing);
        } else {
            try {
                const createdDay = await new Day(day).save();
                console.log("Day CREATED", createdDay);
                res.json(createdDay);
            } catch (err) {
                console.log('----x updateDay new Day (calendar.ctrlr 153):', err);
                res.send({error: "dB access failed"})
            }
        } 
    } catch (err) {
        console.log('----x updateDay findOneAndUpdate (calendar.ctrlr 158):', err);
        res.send({error: "dB access failed"})
    } 
  };