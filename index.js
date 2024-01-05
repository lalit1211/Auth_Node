const color = require('colors')
global._ = (_)=>{
    console.log(color.blue.underline(_))
}
global.err = (_)=>{
    console.log(color.red(_))
}



// ?     setting up the environment variables              
const dotenv = require('dotenv')
dotenv.config(
   { path : './.env'}
)
const { PORT, DATABASE } = process.env;

// ?    database configuration        
const db = require('./database/connection')
db(DATABASE);


 
const app = require('./app')
const connectionDb = require('./database/connection')

// app.use((err, req, res, next) => {
//     res.json({
//         err
//     })
	// const errstatus = err.statusCode || 500;
	// const message = err.message || "Something went wrong";
	// const status = err.status || "error";

	// res.status(errstatus).json({
	// 	message,
	// 	status,
	// });
// });


app.listen(PORT, ()=>{
    _(`server is Running on PORT ==> ${PORT}`)
})