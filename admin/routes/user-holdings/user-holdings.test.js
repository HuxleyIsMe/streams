const controller = require("./user-holdings.controller.js");
const request = require("request");
const config = require("../../config/default.json");
// const isValidJson = (text) => {
//   try {
//     JSON.parse(text);
//     return true;
//   } catch {
//     return false;
//   }
// };
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
    it("converts a list of investments into a row for export", () => {});
  });
});
