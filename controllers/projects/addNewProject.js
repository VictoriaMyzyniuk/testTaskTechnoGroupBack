const connection = require("../../db-connection");

const addNewProject = async (req, res) => {
  const { client, projectName } = req.body;

  connection.query(
    "INSERT INTO project_num_t (ID_DEP_CLIENT, ID_PROJECT) VALUES (?, ?)",
    [client, projectName],
    (err, result) => {
      if (err) {
        console.error("Error executing the query: ", err);
        return res
          .status(500)
          .json({ status: "error", message: "Error executing the query" });
      }

      res.json({
        status: "success",
        code: 200,
        data: { insertedId: result.insertId },
      });
    }
  );
};
module.exports = addNewProject;
