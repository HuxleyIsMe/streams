import config from "../../config/default.json" assert { type: "json" };
import axios from "axios";

const calculateHoldingValue = (investmentTotal, investmentPercentage) =>
  investmentTotal * investmentPercentage;

export const convertHoldersToLib = (holders) =>
  holders.reduce(
    acc,
    (curr) => {
      if (!acc[curr.id]) {
        acc[curr.id] = curr.name;
      }
      return acc;
    },
    {}
  );

export const convertInvestmentsToRows = (investments) =>
  investments.reduce((acc, curr) => {
    curr.holdings.forEach((holding) => {
      acc.push([
        curr.userId,
        curr.firstName,
        curr.lastName,
        curr.date,
        holding.id,
        calculateHoldingValue(
          curr.investmentTotal,
          holding.investmentPercentage
        ),
      ]);
    });
    return acc;
  }, []);

export const userHoldingsController = async (req, res, next) => {
  // its quite heavy to get all the holdings... however in this instance as theres only 3
  // it is fine
  const [{ data: allInvestments }, { data: allHoldings }] = await Promise.all([
    axios.get(`${config.investmentsServiceUrl}/investments`),
    axios.get(`${config.financialCompaniesServiceUrl}/companies`),
  ]);

  console.log({ allInvestments });

  const investmentsCSV = convertInvestmentsToRows(allInvestments);

  axios.post(`http://localhost:8081/exports`, {
    holdings: investmentsCSV,
  });

  res.send({ investmentsCSV });
};
