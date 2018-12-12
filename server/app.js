// var createError = require('http-errors');
var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
//
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

const mysql = require('mysql');
const bodyParser = require('body-parser');
const con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "artists"
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
con.connect(function(err) {
    if (err) throw err;
    console.log("Connection Successful!");
});
// Search the records by artists name
app.get('/api/getName', function(request, response){
    console.log("GetMethod");
    const name = request.query.name;
    const query = `SELECT * FROM history WHERE name LIKE '%${name}%' ORDER BY week`;
    const ret = [];
    console.log(query);
    con.query(query, function (error, result) {
        if (error) {
            return response.status(400).send({error:'Error in database operation'});
        }
        else{
            for (let row of result){
                ret.push(row);
            }
            return response.send({result:ret});
        }
    });
});

//Search the records by song
app.get('/api/getSong', function(request, response){
    console.log("GetMethod");
    const songName = request.query.song;
    const query = `SELECT * FROM history WHERE song = '${songName}' ORDER BY week`;
    const ret = [];
    console.log(query);
    con.query(query, function (error, result) {
        if (error) {
            return response.status(400).send({error:'Error in database operation'});
        }
        else{
            for (let row of result){
                ret.push(row);
            }
            return response.send({result:ret});
        }
    });
});

//Search the records by week
app.get('/api/getWeek', function(request, response){
    console.log("GetMethod");
    const week = request.query.week;
    const query = `SELECT * FROM history WHERE week = '${week}' ORDER BY rank`;
    const ret = [];
    console.log(query);
    con.query(query, function (error, result) {
        if (error) {
            return response.status(400).send({error:'Error in database operation'});
        }
        else{
            for (let row of result){
                ret.push(row);
            }
            return response.send({result:ret});
        }
    });
});
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
//
// // app.use(logger('dev'));
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: false }));
// // app.use(cookieParser());
// // app.use(express.static(path.join(__dirname, 'public')));
// //
// app.use('/', indexRouter);
// // app.use('/users', usersRouter);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
