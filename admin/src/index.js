import express from "express";
import bodyParser from "body-parser";
import config from "config";
import axios from "axios";
import { userHoldingsRouter } from "../routes/user-holdings/user-holdings-route.js";

const app = express();

// change 1.c
app.use(bodyParser.json({ limit: "10mb" }));

app.use(userHoldingsRouter);

app.get("/investments/:id", (req, res) => {
  const { id } = req.params;
  axios.get(
    `${config.investmentsServiceUrl}/investments/${id}`,
    (e, r, investments) => {
      if (e) {
        console.error(e);
        res.send(500);
      } else {
        res.send(investments);
      }
    }
  );
});

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err);
    process.exit(1);
  }
  console.log(`Server running on port ${config.port}`);
});
