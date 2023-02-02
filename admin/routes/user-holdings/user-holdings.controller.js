const config = require("../../config/default.json");
const request = require("request");

const calculateHoldingValue = (investmentTotal, investmentPercentage) =>
  investmentTotal * investmentPercentage;

module.exports.convertInvestmentsToRows = (investments) =>
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

module.exports.userHoldingsController = async (req, res, next) => {
  // its quite heavy to get all the holdings... however in this instance as theres only 3
  // it is fine
  const [allInvestments, allHoldings] = await Promise.all([
    request.get(`${config.investmentsServiceUrl}/investments`),
    request.get(`${config.financialCompaniesServiceUrl}/companies`),
  ]);

  request.post(`http://localhost:8081/exports`, { holdings: {} });
};
