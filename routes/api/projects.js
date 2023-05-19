const express = require("express");
const { projects: controller } = require("../../controllers");

const projectsRouter = express.Router();

projectsRouter.get("/", controller.getAllProjects);

projectsRouter.post("/", controller.addNewProject);

module.exports = projectsRouter;
