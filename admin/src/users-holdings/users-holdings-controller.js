const axios = require("axios");
const config = require("../../config/default.json");
const { convertToLookup } = require("./helpers");

const usersHoldingsController = async (req, res, next) => {
  try {
    const { data: holdings } = await axios.get(
      `${config.investmentsServiceUrl}/companies`
    );
    /** in an ideal world this service would have its own copy of the data so it wouldnt have to do this every time and could simply store it
     * however this would require moving the architecture to an event bus which is out of scope for this test
     */
    const holdersLookup = convertToLookup({
      arrayOfObjects: holdings,
      key: "id",
      value: "name",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  usersHoldingsController,
};
