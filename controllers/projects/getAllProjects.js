const connection = require("../../db-connection");

const getAllProjects = async (req, res) => {
  connection.query(
    "SELECT ID, ID_DEP_CLIENT, ID_PROJECT FROM project_num_t",
    (err, rows) => {
      if (err) {
        console.error("Error executing the query: ", err);
        return res
          .status(500)
          .json({ status: "error", message: "Error executing the query" });
      }

      const projects = rows.map((row) => ({
        id: row.ID,
        client: row.ID_DEP_CLIENT,
        project: row.ID_PROJECT,
      }));

      res.json({
        status: "success",
        code: 200,
        data: { result: projects },
      });
    }
  );
};

module.exports = getAllProjects;
