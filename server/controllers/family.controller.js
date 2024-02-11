

const User = require("../models/user.model");
const Family = require("../models/family.model");
const DebtItem = require("../models/debtItem.model");

exports.getFamily = async (req, res) => {
    console.log('----> getFamily (family.controller 6)', req.email)
    try {
        const user = await User.findOne({ email: req.email });
        console.log('----> user:', user)

        if (user) {
            try {          
                const family = await Family.findOne({ _id: user.family })
                .populate("debtItems", "type startDate endDate item price cycle frequency supplier account")
                .exec();
                console.log('----> getFamily (family.controller 12) user.email, _id, family:', user.email, user._id, family)
                
                if (family) {
                    console.log('----> getFamily Family (family.controller 19):', family)
                    res.status(200).json(family);
                } else {
                    console.log('----x getFamily  Family.find (family.controller 22) NO DEBTS for User:', user._id)
                    res.status(200).json({error: "NO FAMILY FOUND"})
                }

            } catch (err) {
                console.log('----x getFamily  Family.find (family.controller 27):', err)
                res.status(200).json({error: "dB access failed"})
            }
        }
    } catch (err) {
        console.log('----x getFamily Family.findOne (family.controller 31):', err)
        res.status(200).json({error: "dB access failed"})
    }
        
}