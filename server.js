const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const connectDB = require("./config/db")

// Load env file
dotenv.config({ path: "./config/config.env" })

// Connect to db
connectDB()

// Route files
const bootcampRoute = require("./routes/bootcamps")

const app = express()

// Body parser
app.use(express.json())

// Dev logging midleware
if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'))
}

// Mount routes
app.use("/api/v1/bootcamps", bootcampRoute)


const PORT = process.env.PORT || 5001
const server = app.listen(PORT, () => {
    console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`);
})

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`);

    // Close server and exit process
    server.close(() =>  process.exit(1) );
})