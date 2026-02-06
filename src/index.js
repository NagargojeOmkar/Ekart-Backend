const express = require("express");
const app = express();

const serverConfig = require("./config/serverConfig");
const PORT = serverConfig.PORT;

const apiRouter = require("./routes/api_routes");

// Middleware to parse JSON requests
app.use(express.json());    

// Configure routes
app.use("/api", apiRouter);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
