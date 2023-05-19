const app = require("./app");
const connection = require("./db-connection");

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
    console.log(err.message);
    process.exit(1);
  } else {
    app.listen(3001);
    console.log("Connected to the database.");
  }
});
