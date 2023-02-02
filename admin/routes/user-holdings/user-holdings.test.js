const controller = require("./user-holdings.controller.js");
const request = require("request");
const config = require("../../config/default.json");

describe("user-holdings", () => {
  afterEach(() => {
    // restore replaced property
    jest.restoreAllMocks();
  });

  it("gets a list of investments for the user", () => {
    const spy = jest.spyOn(request, "get");
    controller.userHoldingsController();
    expect(spy).toHaveBeenCalledWith(expect.stringContaining(`investments`));
  });

  xit("sends a valid JSON file to the /export route of investments", () => {
    const spy = jest.spyOn(request, "post");

    controller.userHoldingsController();
    expect(spy).toHaveBeenCalledWith("/exports");
  });

  describe("user-holdings-helpers", () => {
    it("converts a list of investments into a row for export", () => {
      const dummyData = [
        {
          id: "1",
          userId: "1",
          firstName: "Billy",
          lastName: "Bob",
          investmentTotal: 1400,
          date: "2020-01-01",
          holdings: [{ id: "2", investmentPercentage: 1 }],
        },
        {
          id: "2",
          userId: "2",
          firstName: "Sheila",
          lastName: "Aussie",
          investmentTotal: 20000,
          date: "2020-01-01",
          holdings: [
            { id: "1", investmentPercentage: 0.5 },
            { id: "2", investmentPercentage: 0.5 },
          ],
        },
        {
          id: "3",
          userId: "1",
          firstName: "Billy",
          lastName: "Bob",
          investmentTotal: 1300,
          date: "2020-02-01",
          holdings: [{ id: "2", investmentPercentage: 1 }],
        },
      ];
      const result = controller.convertInvestmentsToRows(dummyData);
      expect(result).toMatchInlineSnapshot(`
[
  {
    "date": "2020-01-01",
    "firstName": "Billy",
    "holding": "2",
    "lastName": "Bob",
    "userId": "1",
    "value": 1400,
  },
  {
    "date": "2020-01-01",
    "firstName": "Sheila",
    "holding": "1",
    "lastName": "Aussie",
    "userId": "2",
    "value": 10000,
  },
  {
    "date": "2020-01-01",
    "firstName": "Sheila",
    "holding": "2",
    "lastName": "Aussie",
    "userId": "2",
    "value": 10000,
  },
  {
    "date": "2020-02-01",
    "firstName": "Billy",
    "holding": "2",
    "lastName": "Bob",
    "userId": "1",
    "value": 1300,
  },
]
`);
    });
  });
});
