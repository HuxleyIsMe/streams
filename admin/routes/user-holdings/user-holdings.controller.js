const config = require("../../config/default.json");
const request = require("request");

// const answer = {
//     user: '',
//     fn,
//     ln,
//     date,
//     holding,
//     value
// }

const calculateHoldingValue = (investmentTotal, investmentPercentage) =>
  investmentTotal * investmentPercentage;

module.exports.convertInvestmentsToRows = (investments) =>
  investments.reduce((acc, curr) => {
    curr.holdings.forEach((holding) => {
      acc.push({
        userId: curr.userId,
        firstName: curr.firstName,
        lastName: curr.lastName,
        date: curr.date,
        holding: holding.id,
        value: calculateHoldingValue(
          curr.investmentTotal,
          holding.investmentPercentage
        ),
      });
    });
    return acc;
  }, []);

module.exports.userHoldingsController = async (req, res, next) => {
  const [allInvestments, allHoldings] = await Promise.all([
    request.get(`${config.investmentsServiceUrl}/investments`),
    request.get(`${config.financialCompaniesServiceUrl}/companies`),
  ]);

  request.post(`http://localhost:8081/exports`, { holdings: {} });
};
