import DraftLog from "draftlog";
import chalkTable from "chalk-table";
import readline from "readline";
import terminalConfig from "./config/terminal.js";

const TABLE_OPTIONS = terminalConfig.table;

class CustomTerminal {
  constructor() {
    this.print = {};
    this.data = [];
  }

  initialize() {
    DraftLog(console).addLineListener(process.stdin);
    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.initializeTable();
  }

  initializeTable() {
    const table = chalkTable(TABLE_OPTIONS, []);
    this.print = console.draft(table);
  }

  updateTable(item) {
    this.data.push(item);
    this.print(chalkTable(TABLE_OPTIONS, this.data));
  }

  close() {
    this.terminal.close();
  }

  async question(message = "") {
    return new Promise((resolve) => this.terminal.question(message, resolve));
  }
}

export default CustomTerminal;
