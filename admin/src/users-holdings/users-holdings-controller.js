const axios = require("axios");
const fs = require("fs");
const config = require("../../config/default.json");
const { convertToLookup, readFile, hasValidCSV } = require("./helpers");
const { streamAndTransformInvestments } = require("./investments-stream");

const usersHoldingsController = async (__, res, next) => {
  try {
    // this can be its own function now

    if (!hasValidCSV()) {
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

      fs.writeFileSync(`${__dirname}/timeStamp`, String(Date.now()));
    }

    const CSV = readFile(`${__dirname}/${config.generatedCSV}`);

    await axios.post(`${config.investmentsServiceUrl}/investments/export`, {
      data: CSV,
    });

    res.send({ msg: "report made!" }).status(203);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  usersHoldingsController,
};
