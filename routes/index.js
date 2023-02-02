const express = require('express');

// Import our modular routers for /tips and /feedback
const notesRouter = require('./notes');
const htmlRouter = require('./htmlroutes');

const app = express();

app.use('/notes', notesRouter);
app.use('/htmlroutes', htmlRouter);


module.exports = app;