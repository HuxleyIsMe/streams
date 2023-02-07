const axios = require("axios");
const fs = require("fs");
const config = require("../../config/default.json");
const { convertToLookup } = require("./helpers");
const { streamAndTransformInvestments } = require("./investments-stream");

const usersHoldingsController = async (req, res, next) => {
  try {
    const { data: holdings } = await axios.get(
      `${config.financeServiceUrl}/companies`
    );

    // /** in an ideal world this service would have its own copy of the data so it wouldnt have to do this every time and could simply store it
    //  * however this would require moving the architecture to an event bus which is out of scope for this test
    //  */
    const holdersLookup = convertToLookup({
      arrayOfObjects: holdings,
      key: "id",
      value: "name",
    });

    await streamAndTransformInvestments({ holdersLookup });
    const generateCSV = fs.readFileSync(`${__dirname}/generatedCSV`);
    const parsedCSV = JSON.parse(generateCSV.toString().trim());
    await axios.post(`${config.investmentsServiceUrl}/investments/export`, {
      data: parsedCSV,
    });

    res.send({ msg: "report made!" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  usersHoldingsController,
};
