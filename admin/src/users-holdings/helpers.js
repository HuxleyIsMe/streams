const fs = require("fs");

/** takes an array of objects and will convert to a lookup based on a key pair value */
const convertToLookup = ({ arrayOfObjects, key, value }) =>
  arrayOfObjects.reduce((acc, curr) => {
    acc[curr[key]] = curr[value];
    return acc;
  }, {});

const calculateHoldingValue = (total, percentage) => total * percentage;

const transformToCSVWithHolder = ({ investments, holdersLookup }) => {
  const parsedInvestments = JSON.parse(investments);
  return JSON.stringify(
    parsedInvestments.reduce((acc, curr) => {
      curr.holdings.forEach((holding) => {
        acc.push([
          curr.userId,
          curr.firstName,
          curr.lastName,
          curr.date,
          holdersLookup[holding.id] || holding.id,
          calculateHoldingValue(
            curr.investmentTotal,
            holding.investmentPercentage
          ),
        ]);
      });
      return acc;
    }, [])
  );
};

const readFile = (path) => {
  const file = fs.readFileSync(path, "utf-8");
  return JSON.parse(file.toString().trim());
};

const hasValidCSV = () => {
  try {
    const fileData =
      parseInt(fs.readFileSync(`${__dirname}/timeStamp`), 10) || false;
    return fileData && fileData + config.TTLInMS > Date.now() ? true : false;
  } catch (e) {
    return false;
  }
};

module.exports = {
  convertToLookup,
  transformToCSVWithHolder,
  readFile,
  hasValidCSV,
};
