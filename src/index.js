const express = require("express");
const app = express();
const mysql = require('mysql2'); // or mysql

const serverConfig = require("./config/serverConfig");
const PORT = serverConfig.PORT;

const apiRouter = require("./routes/api_routes");
const {category} = require("./models/category");

// Middleware to parse JSON requests
app.use(express.json());    

// Configure routes
app.use("/api", apiRouter);

const db = require("./config/db_config");


//start the server
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`); 

    await db.sync().then(() => {
        console.log("Database connected and synced successfully");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });
    
    
}); 
