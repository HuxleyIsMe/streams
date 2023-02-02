import { userHoldingsController } from "./user-holdings.controller";
const request = require("request");

jest.mock(request);

describe("user-holdings", () => {
  afterEach(() => {
    // restore replaced property
    jest.restoreAllMocks();
  });

  it("sends a valid JSON file to the /export route of investments", () => {
    const spy = jest.spyOn(request, "post");
    expect(spy).toHaveBeenCalledWith("poney");
  });
});
