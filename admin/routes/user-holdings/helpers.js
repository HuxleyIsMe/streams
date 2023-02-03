const calculateHoldingValue = (investmentTotal, investmentPercentage) =>
  investmentTotal * investmentPercentage;

export const convertHoldersToLib = (holders) =>
  holders.reduce((acc, curr) => {
    if (!acc[curr.id]) {
      acc[curr.id] = curr.name;
    }
    return acc;
  }, {});

export const convertInvestmentsToRowsWithHoldings = (
  investments,
  holdingLookup
) =>
  investments.reduce((acc, curr) => {
    curr.holdings.forEach((holding) => {
      acc.push([
        curr.userId,
        curr.firstName,
        curr.lastName,
        curr.date,
        holdingLookup[holding.id] || holding.id,
        calculateHoldingValue(
          curr.investmentTotal,
          holding.investmentPercentage
        ),
      ]);
    });
    return acc;
  }, []);
