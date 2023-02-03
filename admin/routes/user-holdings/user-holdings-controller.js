import config from "../../config/default.json" assert { type: "json" };
import axios from "axios";
import {
  convertHoldersToLib,
  convertInvestmentsToRowsWithHoldings,
} from "./helpers.js";

export const userHoldingsController = async (__, res, next) => {
  try {
    // change 1.a
    const [{ data: allInvestments }, { data: allHoldings }] = await Promise.all(
      [
        axios.get(`${config.investmentsServiceUrl}/investments`),
        axios.get(`${config.financialCompaniesServiceUrl}/companies`),
      ]
    );

    // change 1.b
    const holdingsLib = convertHoldersToLib([...allHoldings]);

    const investmentsCSV = convertInvestmentsToRowsWithHoldings(
      allInvestments,
      holdingsLib
    );

    axios.post(`${config.investmentsServiceUrl}/investments/export`, {
      holdings: investmentsCSV,
    });

    res.send({ investmentsCSV });
  } catch (err) {
    next(`There was an error! ${err}`);
  }
};
