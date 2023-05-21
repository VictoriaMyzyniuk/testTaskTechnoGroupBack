const connection = require("../../db-connection");

const addNewProject = async (req, res) => {
  const { client } = req.body;

  function getFilteredProjects(client) {
    return new Promise((resolve, reject) => {
      const query = "SELECT ID_DEP_CLIENT FROM project_num_t";
      connection.query(query, (err, rows) => {
        if (err) {
          console.error("Error executing the query: ", err);
          reject(err);
          return;
        }
        const filteredRows = rows.filter(
          (row) => row.ID_DEP_CLIENT === client
        ).length;

        resolve(filteredRows);
      });
    });
  }

  try {
    const projectQuantities = await getFilteredProjects(client);

    const projectName = generateProjectName(client, projectQuantities);

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
          data: { id: result.insertId, client: client, project: projectName },
        });
      }
    );
  } catch (err) {
    console.error("Error retrieving filtered projects:", err);
    return res
      .status(500)
      .json({ status: "error", message: "Error retrieving filtered projects" });
  }
};

const generateProjectName = (client, projectQuantities) => {
  const name = client;
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = day + month + year;

  return `${+projectQuantities + 1}-${name}-${formattedDate}`;
};

module.exports = addNewProject;
