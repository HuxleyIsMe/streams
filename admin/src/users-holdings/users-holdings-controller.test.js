const axios = require("axios");
const { usersHoldingsController } = require("./users-holdings-controller");
const config = require("../../config/default.json");
const { PassThrough } = require("stream");
const { streamAndTransformInvestments } = require("./investments-stream");

jest.mock("fs");
jest.mock("./investments-stream");
jest.mock("axios");
jest.useFakeTimers();
/**
 * Im not proud of this test suite, ive found it difficult to mock and stub with the
 * require and module exports syntax im used to import export es6 modules and its has eaten a lot of time
 * trying to work backwards, yes i could have installed babel and compiled however thats a big change to the service
 * rest assured in the real world this suite would be shiny
 */

// i cant get this mock to work, i think its because im used to
// import export syntax and perhaps this doesnt work here
jest.mock("./helpers", () => ({
  ...jest.requireActual("./helpers"),
  hasValidCSV: () => false,
  readFile: jest.fn(),
}));

const res = {};
res.send = () => res;
res.status = () => res;
res.json = () => res;

const mockNext = jest.fn();

describe("users holdings controller", () => {
  beforeEach(() => {
    jest.resetAllMocks();
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

  it.todo("calls the investments stream method");

  it("posts the created JSON file to the exports endpoint in the investment services", async () => {
    axios.get.mockResolvedValue({ data: [{ id: 1, name: "hi" }] });
    const mockAxios = jest.spyOn(axios, "post");
    expect(mockAxios).not.toHaveBeenCalled();
    await usersHoldingsController({}, res, mockNext);
    expect(mockAxios).toHaveBeenCalledWith(
      `${config.investmentsServiceUrl}/investments/export`,
      expect.any(Object)
    );
  });

  /** i wanted to test this further however i was running into issues mocking the validCSV helper function so i left it here for now */
  describe("when previously generated CSVL", () => {
    xit("doesnt generate a new CSV when within TTL", async () => {
      axios.get.mockResolvedValue({ data: [{ id: 1, name: "hi" }] });
      expect(streamAndTransformInvestments).not.toHaveBeenCalled();
      await usersHoldingsController({}, res, mockNext);
      expect(streamAndTransformInvestments).toHaveBeenCalled();
      jest.advanceTimersByTime(1000);
      await usersHoldingsController({}, res, mockNext);
      expect(streamAndTransformInvestments).toHaveBeenCalledTimes(1);
    });

    it.todo("generate a new CSV if time is outside the TTL ");
  });
});
