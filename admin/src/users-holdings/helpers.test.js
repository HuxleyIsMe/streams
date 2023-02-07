const { convertToLookup } = require("./helpers");
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
});
