import { Router } from "express";
import { userHoldingsController } from "./user-holdings.controller";

const userHoldingsRouter = Router();

userHoldingsRouter.get("/user-holdings/:user", userHoldingsController);

export { userHoldingsRouter };
