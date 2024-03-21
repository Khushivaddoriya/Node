const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const logger = require('morgan');
const dotenv = require("dotenv");
dotenv.config();
const { indexRouter } = require('./routes');
const { middleware, i18next } = require('./helpers/i18next');
const UserSeeder = require('./controller/seeder/user.seeder');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(middleware.handle(i18next))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const allowedOrigins = [`http://localhost:${process.env.PORT}`];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// app.use(cors({
//   origin: 'http://localhost:3000',
// }));

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, 'public')));
app.use("/images", express.static("public/images/profile_image"));

UserSeeder();
app.use("/", indexRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.json({ error: err });
});

module.exports = app;
