
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
        console.log(`----x dbCheckRegistrationAuthorization (user.controller 19) authorizedUser ${email} not found.`)
        res.send({
            email: "not found",
          });
    }
}

exports.dbCreateUser = async (req,res) => {
    const newUser = req.body.user;
    console.log('----> dbCreateUser (user.controller 8)')
    const { apiKey, name, email, userData, emailVerified, loggedIn, lastLoginAt, role, refreshToken, accessToken, accessTokenPrev, expirationTime, region } = req.body.user;
    console.log('---> dbCreateUser email ----> ', email)
    let dbUser = null;
    let authorizedUser = null;
    try {
        authorizedUser = await AuthorizedUsers.findOne({ email });
        console.log('----> dbCreateUser (user.controller 23) authorizedUser:', authorizedUser);
    } catch (err) {
        console.log('----x dbCreateUser findOne (user.controller 25):', err)
    }
    try {
        dbUser = await User.findOne({ email });
        // console.log('----> dbCreateUser (user.controller 16) dbUser:', dbUser)
    } catch (err) {
        console.log('----x dbCreateUser findOne (user.controller 17):', err)
    }
    if (user) {
        const msg = `This email ( ${email} ) is already in use.`
        console.log(msg);
        res.send(msg);
    } else {
        try {
            newUser.name = authorizedUser.name;
            newUser.role = authorizedUser.role;
            newUser.region = authorizedUser.region;
            console.log('----> dbCreateUser (user.controller 37) newUser with updates:', newUser)
            const createdUser = await new User(newUser).save();
            console.log("----> dbCreateUser (user.controller 39) newUser with updates:", createdUser);
            res.status(200).json(createdUser);
        } catch (err) {
            console.log('----x dbCreateUser new User (user.controller 43):', err)
            res.status(200).json({error: "dB access failed"})
        }
    }
}

exports.loginUser = async (req,res) => {

}

exports.dbGetUser = async (req,res) => {

}