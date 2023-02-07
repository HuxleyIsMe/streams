const axios = require("axios");
const config = require("../../config/default.json");

const usersHoldingsController = async (req, res, next) => {
  try {
    const { data: holdings } = await axios.get(
      `${config.investmentsServiceUrl}/companies`
    );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  usersHoldingsController,
};
