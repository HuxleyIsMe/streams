import { Router } from "express";
import { userHoldingsController } from "./user-holdings-controller.mjs";

const userHoldingsRouter = Router();

userHoldingsRouter.get("/user-holdings", userHoldingsController);

export { userHoldingsRouter };
