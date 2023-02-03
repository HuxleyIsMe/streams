import config from "../../config/default.json" assert { type: "json" };
import axios from "axios";
import {
  convertHoldersToLib,
  convertInvestmentsToRowsWithHoldings,
} from "./helpers.js";

export const userHoldingsController = async (req, res, next) => {
  // change 1.a
  const [{ data: allInvestments }, { data: allHoldings }] = await Promise.all([
    axios.get(`${config.investmentsServiceUrl}/investments`),
    axios.get(`${config.financialCompaniesServiceUrl}/companies`),
  ]);

  const holdingsLib = convertHoldersToLib([...allHoldings]);

  const investmentsCSV = convertInvestmentsToRowsWithHoldings(
    allInvestments,
    holdingsLib
  );

  axios.post(`http://localhost:8081/investments/export`, {
    holdings: investmentsCSV,
  });

  res.send({ investmentsCSV });
};
