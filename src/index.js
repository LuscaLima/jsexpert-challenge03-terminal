import { log } from "console";
import CustomTerminal from "./terminal.js";
import IncomeService from "./service/IncomeService.js";

const VOCABULARY = {
  STOP: ":q",
};

const terminal = new CustomTerminal();
terminal.initialize();

const service = new IncomeService();

async function mainLoop() {
  try {
    const answer = await terminal.question(
      "What is your job and salary expectation (BRL)? (Position; Expectation)\nType: "
    );

    if (answer === VOCABULARY.STOP) {
      terminal.close();
      log("Finished application");
      return;
    }

    const income = await service.generateIncomeFromString(answer);
    terminal.updateTable(income.format());
  } catch (error) {
    log(error.message);
    return mainLoop();
  }
  return mainLoop();
}

await mainLoop();
