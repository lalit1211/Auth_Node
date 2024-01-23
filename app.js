const express = require('express')
const morgan = require('morgan')



const app = express()
app.use(morgan("dev"));

// ?         body parser middleware            
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// ?             routes                      
const userRoutes = require('./router/user.routes')
app.use("/api/v1", userRoutes);


// ?        global handling middleware            
app.use((err, req, res, next)=>{
    const errstatus = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    const status = err.status || "Internal Server Error";

    res.status(errstatus).json({
        message,
        status
    })
})


module.exports = app