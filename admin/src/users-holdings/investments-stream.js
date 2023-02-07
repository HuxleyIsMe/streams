const axios = require("axios");
const config = require("../../config/default.json");
const { Transform } = require("stream");
const fs = require("fs");
const { transformToCSVWithHolder } = require("./helpers");

const streamAndTransformInvestments = async ({ holdersLookup }) => {
  const { data: investmentsStream } = await axios.get(
    `${config.investmentsServiceUrl}/investments`,
    {
      responseType: "stream",
    }
  );

  const CSVFile = fs.createWriteStream(`${__dirname}/${config.generatedCSV}`);

  const CSVData = new Transform({
    transform(chunk, __, callback) {
      callback(
        null,
        transformToCSVWithHolder({
          investments: chunk,
          holdersLookup,
        })
      );
    },
  });
  investmentsStream
    .pipe(CSVData)
    .on("error", (e) => {
      console.log("i fail creating the CSV");
      throw new Error(e);
    })
    .pipe(CSVFile)
    .on("error", (e) => {
      console.log("i fail writing the CSV");
      throw new Error(e);
    });

  return;
};

module.exports = {
  streamAndTransformInvestments,
};
