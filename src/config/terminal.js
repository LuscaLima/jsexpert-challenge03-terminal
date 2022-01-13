import chalk from "chalk";

export default {
  table: {
    leftPad: 2,
    columns: [
      { field: "position", name: chalk.cyan("Position") },
      { field: "expectation", name: chalk.red("Expectation (BRL)") },
      { field: "conversion01", name: chalk.green("Conversion 01") },
      { field: "conversion02", name: chalk.green("Conversion 02") },
      { field: "conversion02", name: chalk.green("Conversion 03") },
    ],
  },
};
