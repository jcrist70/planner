
const User = require("../models/user.model");
const AuthorizedUsers = require("../models/auth.user.model");
const { auth } = require("firebase-admin");

exports.dbCheckRegistrationAuthorization = async (req,res) => {
    const email = req.body.email;
    console.log('----> dbCheckRegistrationAuthorization (user.controller 6):', email)
    let authorizedUser = null;
    try {
        authorizedUser = await AuthorizedUsers.findOne({ email });
        console.log('----> dbCheckRegistrationAuthorization (user.controller 12) authorizedUser:', authorizedUser);
    } catch (err) {
        console.log('----x dbCheckRegistrationAuthorization findOne (user.controller 14):', err)
    }
    if (authorizedUser) {
        console.log(`----> dbCheckRegistrationAuthorization (user.controller 17) authorizedUser ${email} found.`)
        res.send({
          email: authorizedUser.email,
        });
    } else {
        console.log(`----x dbCheckRegistrationAuthorization (user.controller 22) authorizedUser ${email} not found.`)
        res.send({
            email: "not found",
          });
    }
}

exports.dbCreateUser = async (req,res) => {
    const newUser = req.body.user;
    console.log('----> dbCreateUser (user.controller 31)', newUser)
    const { accessToken, name, email, role, region, emailVerified, photoURL, metadata, stsTokenManager } = newUser;
    console.log('---> dbCreateUser email ----> ', email)
    let dbUser = null;
    let authorizedUser = null;
    try {
        authorizedUser = await AuthorizedUsers.findOne({ email });
        console.log('----> dbCreateUser (user.controller 38) authorizedUser:', authorizedUser);
    } catch (err) {
        console.log('----x dbCreateUser findOne (user.controller 40):', err)
    }
    try {
        dbUser = await User.findOne({ email });
        // console.log('----> dbCreateUser (user.controller 16) dbUser:', dbUser)
    } catch (err) {
        console.log('----x dbCreateUser findOne (user.controller 46):', err)
    }
    if (dbUser) {
        const msg = `This email ( ${email} ) is already in use.`
        console.log(msg);
        res.send(msg);
    } else {
        try {
            newUser.name = authorizedUser.name;
            newUser.role = authorizedUser.role;
            newUser.region = authorizedUser.region;
            newUser.accessToken = newUser.stsTokenManager.accessToken;
            newUser.refreshToken = newUser.stsTokenManager.refreshToken;
            newUser.expirationTime = newUser.stsTokenManager.expirationTime;
            console.log('----> dbCreateUser (user.controller 57) newUser with updates:', newUser)
            const createdUser = await new User(newUser).save();
            console.log("----> dbCreateUser (user.controller 59) newUser with updates:", createdUser);
            res.status(200).json(createdUser);
        } catch (err) {
            console.log('----x dbCreateUser new User (user.controller 62):', err)
            res.status(200).json({error: "dB access failed"})
        }
    }
}

exports.loginUser = async (req,res) => {
    const email = req.body.email;
    console.log('----> loginUser (user.controller 70)', email)
    try {
        dbUser = await User.findOne({ email });
        console.log('----> loginUser (user.controller 73) dbUser:', dbUser)
        if (dbUser) {
            req.session.user = dbUser;
            req.session.loginStatus = true;
            dbUser.loggedIn = true;
            dbUser.lastLoginAt = new Date();
            res.json(dbUser);
        } else {
            res.json({user: "user not found"});
        }
    } catch (err) {
        console.log('----x loginUser findOne (user.controller 81):', err)
        res.send({user: "db fail"})
    }
}

exports.dbGetUser = async (req,res) => {
    console.log("dbGetUser")
}