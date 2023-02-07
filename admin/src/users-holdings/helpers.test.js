const { convertToLookup, transformToCSVWithHolder } = require("./helpers");
describe("users holdings helpers", () => {
  describe("convertToLookup", () => {
    it("converts an array of objects to a lookup lib pattern", () => {
      const dummyData = [
        {
          id: 1,
          artist: "Tenderlonius",
          song: "song for my father",
        },
        {
          id: 2,
          artist: "The monkees",
          song: "steppin stone",
        },
      ];

      const desiredResult = {
        1: "Tenderlonius",
        2: "The monkees",
      };

      expect(
        convertToLookup({
          arrayOfObjects: dummyData,
          key: "id",
          value: "artist",
        })
      ).toEqual(desiredResult);
    });
  });

  describe("transformToCSVWithHolder", () => {
    it.only("transforms an array of investments to a csv row including the correct holding name", () => {
      const mockedLib = {
        1: "calvin Harris",
        2: "pixies",
      };

      const mockData = [
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
      ];

      const desired = [
        ["1", "Billy", "Bob", "2020-01-01", "pixies", 1400],
        ["2", "Sheila", "Aussie", "2020-01-01", "calvin Harris", 10000],
        ["2", "Sheila", "Aussie", "2020-01-01", "pixies", 10000],
      ];

      expect(
        transformToCSVWithHolder({
          // for the stream must have as a string
          investments: JSON.stringify(mockData),
          holdersLookup: mockedLib,
        })
      ).toEqual(JSON.stringify(desired));
    });
  });
});
