const connection = require("../../db-connection");

const getAllProjects = async (req, res) => {
  connection.query("SELECT ID_DEP_CLIENT FROM project_num_t", (err, rows) => {
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

module.exports = getAllProjects;
