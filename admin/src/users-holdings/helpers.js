/** takes an array of objects and will convert to a lookup based on a key pair value */
const convertToLookup = ({ arrayOfObjects, key, value }) =>
  arrayOfObjects.reduce((acc, curr) => {
    acc[curr[key]] = curr[value];
    return acc;
  }, {});

module.exports = {
  convertToLookup,
};
