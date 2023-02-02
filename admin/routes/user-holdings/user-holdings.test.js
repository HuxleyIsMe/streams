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
    expect(spy).toHaveBeenCalledWith(expect.stringContaining(`companies`));
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
  [
    "1",
    "Billy",
    "Bob",
    "2020-01-01",
    "2",
    1400,
  ],
  [
    "2",
    "Sheila",
    "Aussie",
    "2020-01-01",
    "1",
    10000,
  ],
  [
    "2",
    "Sheila",
    "Aussie",
    "2020-01-01",
    "2",
    10000,
  ],
  [
    "1",
    "Billy",
    "Bob",
    "2020-02-01",
    "2",
    1300,
  ],
]
`);
    });

    xit("converts the holding companies to a library", () => {
      expect(controller.holdingCiompaniesLib);
    });
  });
});
