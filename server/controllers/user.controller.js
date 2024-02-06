
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
    const token = req.body.authtoken;
    const user = JSON.parse(req.body.user);
    console.log('----> loginUser (user.controller 75): FB email, verified', email, user.emailVerified)
    try {
        dbUser = await User.findOne({ email });
        console.log('----> loginUser (user.controller 78) dbUser.email:', dbUser.email)
        if (dbUser) {
            // update session
            req.session.loginStatus = true;
            req.session.apiKey = user.apiKey;
            req.session.accessToken = token;
            req.session.refreshToken = user.stsTokenManager.refreshToken;
            req.session.expirationTime = user.stsTokenManager.expirationTime

            // update and save dbUser
            dbUser.loggedIn = true;
            dbUser.lastLoginAt = new Date();
            dbUser.apiKey = user.apiKey;
            dbUser.accessToken = token;
            dbUser.refreshToken = user.stsTokenManager.refreshToken;
            dbUser.expirationTime = user.stsTokenManager.expirationTime;
            const newDbUser = await User.findOneAndUpdate({ email }, dbUser, { new: true }).exec();
            req.session.user = newDbUser;

            res.json(newDbUser);
        } else {
            res.json({user: "user not found"});
        }
    } catch (err) {
        console.log('----x loginUser findOne (user.controller 103):', err)
        res.send({user: "db fail"})
    }
}

exports.dbGetUser = async (req,res) => {
    console.log("dbGetUser")
}

let test = true;
let verifyUserCount = -1;
exports.verifyUser = async (req,res) => {
    if (req.session.user) {
        console.log('---- verifyUser (user.controller 114):', req.session.user.email)
        try {
            let expiresIn = ((new Date(req.session.cookie.expires) - new Date())/1000/60).toFixed(2);
            if (test) {
              expiresIn = 4;
              test = false;
            } 
            if (verifyUserCount === 0) {
              console.log('---- verifyUser (user.controller 123):', req.session.user.email, req.session.cookie._expires)
            } else if (verifyUserCount >= 10) {
                verifyUserCount = -1;
            }
            verifyUserCount++;
            const loggedIn = req.session.loggedIn || false;
            const role = req.session.user.role || '';
            res.send({ expiresIn, status: "valid", loggedIn, role})
          } catch (err) {
            console.log('----x verifyUser (user.controller 136):', err)
            res.send({status: "expired", loggedIn: false, role: ''})
          }
    } else {
        console.log('---- verifyUser (user.controller 137) NO SESSION!!!')
        res.send({status: "no session", loggedIn: false, role: ''})
    }   
}

exports.updateSession = async (req,res) => {
    console.log('---- updateSession (user.controller 138):')
    req.session.cookie._expires = new Date().addHours(1);
    let user = req.session.user;
    user.accessTokenPrev = user.accessToken; 
    user.accessToken = req.body.authToken;
    try {
        const updatedDbUser = await User.findOneAndUpdate({ email: user.email }, user, { new: true }).exec();
        req.session.user = user;
    } catch (err) {
        res.status(200).json({status: 'fail'});
    }
    res.status(200).json({status: 'success'});
}