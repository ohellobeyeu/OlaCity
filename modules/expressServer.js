function express () {
  const express = require("express");
  const app = express();
  app.use(express.static("public"));
  app.post("/", (request, response) => {
    response.sendFile('/app/data/index.html')
    console.log("OK")
  })
  const listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });
}

exports.expressServer = function() {
  express ()
};
