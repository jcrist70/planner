const admin = require("../config/fb");
const User = require("../models/user.model");

exports.authCheck = async (req, res, next) => {
  console.log('---- authCheck (auth.middleware 4)', req.session);
  const token = req.headers.authtoken || req.session.user.accessToken;
  console.log('authCheck Session loggedIn (auth.middleware 7) ----> ', token, req.session.isLoggedIn);
  try {
    const firebaseUser = await admin.auth()
      .verifyIdToken(token);
    if (firebaseUser) {
      req.fbUser = firebaseUser;
      req.session.isAuthenticated = true;
      req.session.isLoggedIn = true;
      req.session.emailVerified = firebaseUser.emailVerified;
      console.log('---- authCheck (auth.middleware 17) !! FB USER FOUND !!', firebaseUser)
    } else {
      req.user = null;
      req.session.isAuthenticated = false;
      req.session.isLoggedIn = false;
      console.log('----x authCheck (auth.middleware 21) !! NO FB USER !!')
    }
    next();
  } catch (err) {
    console.log('----x authCheck (auth.middleware 26) error:', err)
    res.status(200).json({
      err: "Invalid or expired token",
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  console.log('---- adminCheck (auth.middleware 33)');
  const { email } = req.body.user;
  const adminUser = await User.findOne({ email }).exec();
  if (adminUser.role !== "admin") {
    console.log('----x adminCheck (auth.middleware 38) NOT ADMIN !!');
    res.status(403).json({
      err: "Admin resource. Access denied.",
    });
  } else {
    next();
  }
};
