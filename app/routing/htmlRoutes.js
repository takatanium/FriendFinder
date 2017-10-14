let path = require("path");

module.exports = function(app) {
  app.get("/script.js", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/script.js"));
  });
  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/survey.html"));
  });
  app.use(function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/home.html"));
  });
};
