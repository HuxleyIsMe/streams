const { Router } = require("express");
const { usersHoldingsController } = require("./users-holdings-controller");

const usersHoldings = Router();

usersHoldings.get("/users-holdings", usersHoldingsController);

module.exports = {
  usersHoldings,
};
