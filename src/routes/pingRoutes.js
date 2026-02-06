const {pingController} = require("../controllers/ping_controller");

function configurePingRoutes(app) {
  app.get("/ping", pingController);  // mapping route to controller
}

module.exports = { configurePingRoutes };