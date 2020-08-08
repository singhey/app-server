var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var axios = require('axios')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.use('/', (req, res, next) => {
  let baseUrl = "https://dreamgaming.in/skywinner/ansKJ873jhj7shd/"
  // console.log(req.url, req.query, req.body)
  // if(req.url === "/get_user_profile/?access_key=1111prince1111&id=642965&username=singhey&token=youdontknow") {
  //   console.log("Got request to return user data. sending modified")
  //   return res.send({ result:
  //     [ { fname: 'Abhishek',
  //         lname: 'Singh',
  //         user_profile: null,
  //         gender: '',
  //         dob: '',
  //         state: '',
  //         cur_balance: '150',
  //         won_balance: '100',
  //         bonus_balance: '0',
  //         status: '1',
  //         success: '1' } ] })
  // }
  axios({
    method: req.method,
    url: `${baseUrl}${req.url}`,
    data: req.body
  }).then(function(response){
    console.log("Response")
    console.log(response.data)
    return res.send(response.data)
  }).catch(function(err){
    console.log("Error")
    console.log(err)
    return res.send(err.response)
  });

  // console.log("DId it reach here")
//   res.send({
//     "result": [
//         {
//             "id": "642965",
//             "fname": "Abhishek",
//             "lname": "Singh",
//             "user_profile": null,
//             "username": "singhey",
//             "email": "hello@mailinator.com",
//             "code": "91",
//             "mobile": "9066645227",
//             "success": "1"
//         }
//     ]
// })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  console.log(err)
  res.status(err.status || 500);
  res.render('error');
});

console.log("App started")

module.exports = app;
