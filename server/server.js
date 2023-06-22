//require the package
const express = require('express');
const app = express();
//port num to run the server
const PORT = 3434;
//start the server
const mongoose = require('mongoose');
const path = require('path');

const messageController = require('./controllers/messageController');
//const authController = 

const URI = '';

//connect and verify
mongoose.connect(URI)
  .then(() => {
    console.log('connected to mongo', );
  })
  .catch((err) => {
    console.log(err);
  });

// serve static files
app.use(express.static('views'));
app.use(express.static('assets'));
// app.use(express.static(path.join(__dirname, '../assets')));

//parse any incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// //setup basic route
// app.get('/', (req, res) => {
//   return res.status(200).send('hello world!');
// });

//CREATE
//added anonymous function to test if it's ever going through my router- which it when I use localhost:3434/postMessage in postman though the request is unsuccessful

app.post(
  '/postMessage', 
  ()=>{console.log('reached postMessage router');}, 
  messageController.postMessage, 
  (req, res) => {
    // console.log('back inside postMessage', req.body)
    return res.status(200).json(res.locals.newMessage);
  });

//READ/GETMESSAGES
app.get(
  '/allMsg',
  messageController.getMessages,
  (req, res) => {
    console.log('back inside getMessages', res.locals.messageList);
    console.log('back inside length is', res.locals.messageList.length);
    return res.status(200).json(res.locals.messageList);
  });

//DELETE 
app.delete(
  '/',
  messageController.deleteMessage,
  (req, res) => {
    return res.status(200);
  });

// global error handling
app.use('/', (err, req, res, next) => {
  const defaultErr = {
    log: 'global error handler caught unknown middleware error',
    status: 400,
    message: 'an error occurred'
  };
  //do something with the pased in err
  const responseErr = {
    ...defaultErr,
    log: err.log,
    status: err.status,
    message: err.message,
  };
  // console.log(errorObj.log);
  return res.status(responseErr.status).send(responseErr.message);
});

//localhost/3434 loads but reads NOT FOUND
app.listen(PORT, () => {
  console.log('listening on Port', PORT);
});