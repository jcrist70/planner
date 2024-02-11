const admin = require("../config/fb");
const User = require("../models/user.model");

exports.authCheck = async (req, res, next) => {
  console.log('---- authCheck (auth.middleware 4)');
  let token = null; //req.headers.authtoken || req.session.user.accessToken;
  if (req.headers.authtoken) {
    // console.log('---- authCheck (auth.middleware 8), headers.authtoken:', req.headers)
    token = req.headers.authtoken;
  } else if (req.session.user) {
    // console.log('---- authCheck (auth.middleware 11), headers.authtoken:', req.session)
    if (req.session.user.accessToken) {
      token = req.session.user.accessToken;
    }
  } else {
    console.log(' !! MISSING TOKEN !! ');
  }
  
  // console.log('authCheck Session loggedIn (auth.middleware 17) ----> ', token, req.session.isLoggedIn);
  try {
    const firebaseUser = await admin.auth()
      .verifyIdToken(token);
    if (firebaseUser) {
      req.fbUser = firebaseUser;
      req.session.isLoggedIn = true;
      req.session.emailVerified = firebaseUser.emailVerified;
      console.log('---- authCheck (auth.middleware 26) !! FB USER FOUND !!')
      req.email = firebaseUser.email;
    } else {
      req.user = null;
      req.session.isAuthenticated = false;
      req.session.isLoggedIn = false;
      req.email = null;
      console.log('----x authCheck (auth.middleware 31) !! NO FB USER !!')
    }
    next();
  } catch (err) {
    console.log('----x authCheck (auth.middleware 35) error:', err)
    res.status(200).json({
      err: "Invalid or expired token",
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  console.log('---- adminCheck (auth.middleware 42)');
  const { email } = req.body.user;
  const adminUser = await User.findOne({ email }).exec();
  if (adminUser.role !== "admin") {
    console.log('----x adminCheck (auth.middleware 47) NOT AN ADMIN !!');
    res.status(403).json({
      err: "Admin resource. Access denied.",
    });
  } else {
    next();
  }
};
