const mongoose = require('mongoose')


// ?                    connection with database                      
const db = function (DATABASE) {
	mongoose.connect(DATABASE);
};


// ?         event-listener if successfully connected with db        
mongoose.connection.on("connected", () =>
	___("--> Connected to MongoDB"),
);

// ?        event listener when error comes while connecting         
mongoose.connection.on("error", (error) =>
	err("Error connecting to DataBase----->> " + error),
);


module.exports = db