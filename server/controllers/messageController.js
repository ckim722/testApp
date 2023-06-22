/* eslint-disable indent */
const Messages = require('../models/MessageModel');
const messageController = {};

//Haven't been able to test connection from server, routers, to controllers and database because not much is console-logging despite urls and syntax matching
//It's also hard to see on the console side since my add button
//checking mongodb, I see nothing in my database
//my add button is functioning and starts a fetch request, but it gets jumbled by the controller.
//I've tried making a post request to postman with both the localhost:3434 to which I get a 404
//whereas to http://127.0.0.1:5500/views/index.html, through goLive on VS code, I get a 405.

// [ ] Function postMessage should create a new item in the database
messageController.postMessage = async function (req, res, next) {
    const {message, password} = req.body;
    const newMessage = await Messages.create({ message, password});

    try{
        console.log('in postMessage controller TRY:', newMessage);

        res.locals.newMessage = newMessage;
        res.locals.password = password;
        return next();
    } catch (err){
        return next({
            status:500,
            log: 'something happened in postMessage controller TRY;' + err,
            message: 'message unable to add, please try again'
        });
    }
};

//getMessages
//should retrieve all items from the database and send it back to the client as JSON
messageController.getMessages = async function (req, res, next) {
    const messageList = await Messages.find({});

    try{
        //if find returns an empty array, then invoke the global error handler;
        console.log('in getMessages controller TRY:', messageList);
        
        res.locals.messageList = messageList;
        return next();
    } catch (err){
        return next({
            status:500,
            log: 'something happened iin getMessages controller TRY;' + err,
            message: 'unable to read messagess please try again'
        });
    }
};

//deleteMessage
//should find items in the database based on an ID number and delete the message if it exists - believe mongodb automatically creates an _id
messageController.deleteMessage = async function (req, res, next) {
    const {_id} = req.body;
    const deleted = await Messages.deleteOne({_id});
    try{
        console.log('in deleteMessage controller TRY:', deleted);
        return next();
    } catch (err){
        return next({
            status:500,
            log: 'something happened in deleteMessage controller TRY;' + err,
            message: 'unable to delete message please try again'
        });
    }
};

module.exports = messageController;
