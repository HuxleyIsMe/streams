const Router = require("express");
const userHoldingsController = require("./user-holdings.controller.js");

const userHoldingsRouter = Router();

userHoldingsRouter.get("/user-holdings/:user", userHoldingsController);

export { userHoldingsRouter };
