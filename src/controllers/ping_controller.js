function pingController(req, res) {
  res.status(200).json({ message: "pong from pingController From API V1" });
}

function pingControllerv2(req, res) {
  res.status(200).json({ message: "pong from api V2" });
}

module.exports = { pingController };