let express = require('express');
let parser = require('body-parser');

let app = express();
let port = process.env.PORT || 3000;

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(parser.text());
app.use(parser.json({ type: 'application/vnd.api+json' }));

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

app.listen(port, function() {
  console.log("App listening on PORT " + PORT);
});
