import IncomeRepository from "./../repository/IncomeRepository.js";
import Income from "./../entity/Income.js";
import language from "../config/language.js";

const defaultLanguage = language.default;

class IncomeService {
  constructor({ incomeRepository = new IncomeRepository() } = {}) {
    this.incomeRepository = incomeRepository;
  }

  async generateIncomeFromString(incomeString, delimiter = ";") {
    const [position, rawExpectationValue] = incomeString.split(delimiter);

    if (!position) {
      throw new Error(
        "Position is a required field. Please make sure you are providing a position."
      );
    }
    if (/\D/g.test(String(rawExpectationValue).trim())) {
      throw new Error(
        "A valid Expectation is required. Please note that only numbers are allowed."
      );
    }

    const expectationValue = Number(rawExpectationValue);
    const { USD, EUR, RUB } = await this.incomeRepository.getConversions();

    const expectation = {
      language: defaultLanguage,
      value: expectationValue,
      currency: "BRL",
    };

    const conversion01 = {
      language: "en-US",
      value: expectationValue * USD,
      currency: "USD",
    };

    const conversion02 = {
      language: "en-GB",
      value: expectationValue * EUR,
      currency: "EUR",
    };

    const conversion03 = {
      language: "ru-RU",
      value: expectationValue * RUB,
      currency: "RUB",
    };

    return new Income({
      position,
      expectation,
      conversion01,
      conversion02,
      conversion03,
    });
  }
}

export default IncomeService;
