const connection = require("../../db-connection");

const getAllClients = async (req, res) => {
  connection.query("SELECT ID_DEP_CLIENT FROM client_t", (err, rows) => {
    if (err) {
      console.error("Error executing the query: ", err);
      return;
    }

    res.json({
      status: "success",
      code: 200,
      data: { result: rows.map((row) => row.ID_DEP_CLIENT) },
    });
  });
};

module.exports = getAllClients;
