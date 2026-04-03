// src/index.js

const express = require("express");
const app = express();

require("dotenv").config();

const serverConfig = require("./config/serverConfig");
const PORT = serverConfig.PORT;

const apiRouter = require("./routes/api_routes");
const v1Router = require("./routes/v1/index");
const errorHandler = require("./middleware/error_handler");

const db = require("./config/db_config");


// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors({ origin: '*' })); // add this before your routes


// ✅ Routes
app.use("/api", apiRouter);
app.use("/api/v1", v1Router);


// ✅ Error handler (ALWAYS LAST)
app.use(errorHandler);


// 🔥 DB Initialization function (clean approach)
async function initializeDatabase() {
    try {
        if (process.env.DB_SYNC === "true") {
            console.log("⚡ DB Sync Enabled...");
            await db.sequelize.sync({ alter: true });
            console.log("✅ Database synced successfully");
        } else {
            console.log("🚀 DB Sync Skipped (Production Mode)");
        }
    } catch (err) {
        console.error("❌ DB connection failed:", err);
    }
}


// 🚀 Start server
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

    await initializeDatabase(); // 🔥 controlled sync
});