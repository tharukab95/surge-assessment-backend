const axios = require("axios");
const { getLaureates } = require("../../controllers/laureatesController"); // Replace 'your-module' with the actual module path

jest.mock("axios");

describe("getLaureates", () => {
  it("fetches data from API with correct parameters", async () => {
    const req = {
      query: {
        offset: 0,
        gender: "male",
        birthDate: "1900-01-01",
        deathDate: "2000-01-01",
        nobelPrizeCategory: "physics",
      },
    };

    const res = {
      json: jest.fn(),
    };

    const expectedURL =
      "http://api.nobelprize.org/2.0/laureates?offset=0&limit=12&gender=male&birthDate=1900-01-01&deathDate=2000-01-01&nobelPrizeCategory=physics";

    const responseData = {
      /* Mocked response data */
    };
    axios.get.mockResolvedValueOnce({ data: responseData });

    await getLaureates(req, res);

    expect(axios.get).toHaveBeenCalledWith(expectedURL); // 1
    expect(res.json).toHaveBeenCalledWith(responseData); // 2
  });
});
