const express = require("express");
const { clients: controller } = require("../../controllers");

const clientsRouter = express.Router();

clientsRouter.get("/", controller.getAllClients);

module.exports = clientsRouter;
