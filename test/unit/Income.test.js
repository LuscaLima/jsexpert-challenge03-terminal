import { describe, it } from "mocha";
import { expect } from "chai";
import Income from "../../src/entity/Income.js";

import { mocks } from "../mocks/incomeRepository.mock.js";

describe("Income Suite Tests", () => {
  it("should format values", () => {
    const { USD, EUR, RUB } = mocks.convertResponse.results;
    const expectation = 15_000;
    const position = "Senior Javascript Engineer";
    const sut = new Income({
      position,
      expectation: {
        language: "pt-BR",
        currency: "BRL",
        value: expectation,
      },
      conversion01: {
        language: "en-US",
        currency: "USD",
        value: expectation * USD,
      },
      conversion02: {
        language: "en-GB",
        currency: "EUR",
        value: expectation * EUR,
      },
      conversion03: {
        language: "ru-RU",
        currency: "RUB",
        value: expectation * RUB,
      },
    });

    const expected = {
      conversion01: "$2,610.87",
      conversion02: "€2,315.13",
      conversion03: "193 051,70 ₽",
      expectation: "R$ 15.000,00",
      position: "Senior Javascript Engineer",
    };
    const { id, ...result } = sut.format();

    expect(result).to.be.deep.equal(expected);
  });
});
