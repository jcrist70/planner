
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const bodyParser = require('body-parser');
const createError = require('http-error');
const { readdirSync } = require("fs");
const { v4: uuid } = require('uuid');
const mongoose = require("mongoose");
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const DB_KEY = process.env.DATABASE;

mongoose.connect(DB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERR", err));

exports.sessionStore = new MongoDBStore({
  collection: "userSessions",
  uri: DB_KEY,
  expires: 1000,
});

const app = express();
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  genid: function(req) {
    const id = uuid();
    return id
  },
  name: "SESSION",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: module.exports.sessionStore,
  cookie: {
    // sameSite: 'none', // DONT USE FOR localhost
    // secure: process.env.NODE_ENV === "production",
    secure: false,
    maxAge: 1000 * 60 * 60 * 1, //1 hour
    httpOnly: false,
  },
}));
app.use(
  cors({
    origin: [process.env.CORS_ORIGIN, "http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

const PORT = process.env.SERVER_PORT ?? 4000;
app.listen(PORT, '0.0.0.0', async () => {
	console.log(`SERVER listening on port ${PORT}`);
});