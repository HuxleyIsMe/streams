import config from "../../config/default.json" assert { type: "json" };
import request from "request";

const calculateHoldingValue = (investmentTotal, investmentPercentage) =>
  investmentTotal * investmentPercentage;

export const convertInvestmentsToRows = (investments) =>
  investments.reduce((acc, curr) => {
    curr.holdings.forEach((holding) => {
      // csv means this should be columns
      acc.push([
        curr.userId,
        curr.firstName,
        curr.lastName,
        curr.date,
        holding.id,
        calculateHoldingValue(
          curr.investmentTotal,
          holding.investmentPercentage
        ),
      ]);
    });
    return acc;
  }, []);

export const userHoldingsController = async (req, res, next) => {
  // its quite heavy to get all the holdings... however in this instance as theres only 3
  // it is fine
  const [allInvestments, allHoldings] = await Promise.all([
    request.get(`${config.investmentsServiceUrl}/investments`),
    request.get(`${config.financialCompaniesServiceUrl}/companies`),
  ]);

  const investmentsCSV = convertInvestmentsToRows(allInvestments);

  request.post(`http://localhost:8081/exports`, {
    holdings: investmentsCSV,
  });

  res.send({ investmentsCSV });
};
