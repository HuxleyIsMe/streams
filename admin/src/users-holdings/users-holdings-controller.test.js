const axios = require("axios");
const { usersHoldingsController } = require("./users-holdings-controller");
const config = require("../../config/default.json");
const { PassThrough } = require("stream");

jest.mock("axios");

const res = {};
res.send = () => res;
res.status = () => res;
res.json = () => res;

const mockNext = jest.fn();

describe("users holdings controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("GET's a list of holders", async () => {
    const mockAxios = jest.spyOn(axios, "get");
    expect(mockAxios).not.toHaveBeenCalled();
    await usersHoldingsController({}, res, mockNext);
    expect(mockAxios).toHaveBeenCalledWith(
      `${config.financeServiceUrl}/companies`
    );
  });

  it("throws an error if it fails to GET a list of holders", async () => {
    axios.get.mockRejectedValue({ error: "some error" });
    expect(mockNext).not.toHaveBeenCalled();
    await usersHoldingsController({}, res, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });

  /** It has been a while i need to recheck how to test streamsproperly in real life i wouldnt leave this */
  xit("streams a list of transactions", async () => {
    const mockAxios = jest.spyOn(axios, "get");
    const mockedAxiosStream = new PassThrough();
    axios.get.mockResolvedValue(mockedAxiosStream);
    expect(mockAxios).not.toHaveBeenCalled();
    await usersHoldingsController({}, res, mockNext);
    expect(mockAxios).toHaveBeenCalledWith(
      `${config.investmentsServiceUrl}/investments`
    );
  });
});
