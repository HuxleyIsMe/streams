const config = require("../../config/default.json");
const request = require("request");

module.exports.convertInvestmentsToRows = (data) => {};

module.exports.userHoldingsController = (req, res, next) => {
  const allInvestments = request.get(
    `${config.investmentsServiceUrl}/investments`
  );

  request.post(`http://localhost:8081/exports`, { holdings: {} });
};
