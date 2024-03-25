import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { URL } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = new URL('', import.meta.url).pathname;
const __dirname = new URL('.', import.meta.url).pathname;

import indexRouter from '../routes/index.js';
import userRouter from '../routes/user.js';
import testAPIRouter from '../routes/testAPI.js';
import { initDriver, neo4jSessionCleanup } from './neo4j.js';

var app = express();

app.use(express.static(path.join(__dirname, '../../client/build')))

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

initDriver(process.env.DB_URL, process.env.USER_NAME, process.env.PASSWORD);
app.use(neo4jSessionCleanup);

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/testAPI', testAPIRouter)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '../../client/build/index.html'))
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
