import { isAvailable } from "../../src/controller/scrape.js";
import axios from "axios";

jest.mock("axios");

describe("Scrape", () => {
  it("should call axios and return appointment available", async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: {
          total: 5,
        },
      })
    );

    const available = await isAvailable("whatever", "01-01-2024", 3);
    expect(axios.get).toHaveBeenCalled();
    expect(available).toEqual(true);
  });
});

describe("Scrape", () => {
  it("should call axios and return appointment unavailable", async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: {
          total: 0,
          reason: "any",
          message: "any",
        },
      })
    );

    const available = await isAvailable("whatever", "01-01-2024", 3);
    expect(axios.get).toHaveBeenCalled();
    expect(available).toEqual(true);
  });
});

describe("Scrape", () => {
  it("should call axios and return appointment unavailable without reason", async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: {
          total: 0,
        },
      })
    );

    const available = await isAvailable("whatever", "01-01-2024", 3);
    expect(axios.get).toHaveBeenCalled();
    expect(available).toEqual(true);
  });
});
