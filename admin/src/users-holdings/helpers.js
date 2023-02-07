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

module.exports = {
  convertToLookup,
  transformToCSVWithHolder,
};
