const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// // v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
// const myURI = 'mongodb+srv://ckim722:X6jKI0UJqzZfGPID@cluster0.ftluwvf.mongodb.net/';

// // UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

// [ ] We want to store our data in a collection/table called Message. (Remember, this may be created as the plural Messages - that is fine.)
// [ ] All items in the database must have a property message which is a string
// [ ] All items must also have a property password which is a string
// [ ] Additionally, all items should be stored with the time they were created_at. This should default to now
const Messages = new Schema({
  message: {type: String},
  password: {type: String}
  created_at: {}
});


module.exports = mongoose.model('Messages', Messages); // <-- export your model
