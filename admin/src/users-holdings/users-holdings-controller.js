const axios = require("axios");
const config = require("../../config/default.json");

const { convertToLookup } = require("./helpers");

const usersHoldingsController = async (req, res, next) => {
  try {
    const { data: holdings } = await axios.get(
      `${config.financeServiceUrl}/companies`
    );
    /** in an ideal world this service would have its own copy of the data so it wouldnt have to do this every time and could simply store it
     * however this would require moving the architecture to an event bus which is out of scope for this test
     */
    const holdersLookup = convertToLookup({
      arrayOfObjects: holdings,
      key: "id",
      value: "name",
    });

    const { data: investmentsStream } = await axios.get(
      `${config.investmentsServiceUrl}/investments`,
      {
        responseType: "stream",
      }
    );

    investmentsStream.on("data", (data) => {
      console.log("\n", JSON.parse(data));
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  usersHoldingsController,
};
