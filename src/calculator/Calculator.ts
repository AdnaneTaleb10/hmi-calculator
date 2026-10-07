import type { Operator } from "./types";

export class Calclator {
  private firstOperand = "";
  private operator: Operator | null = null;
  private secondOperand = "";
  private result = "";

  public inputDigit(digit: string): void {
    if (this.operator === null) {
      this.firstOperand += digit;
    } else {
      this.secondOperand += digit;
    }
  }

  public inputDecimal(): void {
    if (this.operator === null) {
      if (!this.firstOperand.includes(".")) {
        this.firstOperand += this.firstOperand === "" ? "0." : ".";
      }
    } else {
      if (!this.secondOperand.includes(".")) {
        this.secondOperand += this.secondOperand === "" ? "0." : ".";
      }
    }
  }

  public setOperator(operator: Operator): void {
    if (this.firstOperand !== "" && this.operator === null) {
      this.operator = operator;
      return;
    }

    if (
      this.firstOperand !== "" &&
      this.operator !== null &&
      this.secondOperand !== ""
    ) {
      this.calculate();

      if (this.result === "Infinity") {
        return;
      }

      this.firstOperand = this.result;
      this.secondOperand = "";
      this.operator = operator;

    }
  }

  public calculate(): string {
    if (
      this.firstOperand === "" ||
      this.operator === null ||
      this.secondOperand === ""
    ) {
      if (this.firstOperand !== "" && this.operator === null) {
        this.result = this.firstOperand;
        return this.result;
      }

      return "Error";
    }

    const first = parseFloat(this.firstOperand);
    const second = parseFloat(this.secondOperand);

    let calculation: number;

    switch (this.operator) {
      case "+":
        calculation = first + second;
        break;

      case "-":
        calculation = first - second;
        break;

      case "*":
        calculation = first * second;
        break;

      case "/":
        if (second === 0) {
          this.result = "Infinity";
          return this.result;
        }

        calculation = first / second;
        break;

      default:
        return "Error";
    }

    this.result = this.formatResult(calculation);

    return this.result;
  }

  private formatResult(value: number): string {
    return Number.isInteger(value)
      ? String(value)
      : parseFloat(value.toFixed(3)).toString();
  }

  public clear(): void {
    this.firstOperand = "";
    this.operator = null;
    this.secondOperand = "";
    this.result = "";
  }

  public deleteLast(): void {
    if (this.secondOperand !== "") {
      this.secondOperand = this.secondOperand.slice(0, -1);
      return;
    }

    if (this.operator !== null) {
      this.operator = null;
      return;
    }

    if (this.firstOperand !== "") {
      this.firstOperand = this.firstOperand.slice(0, -1);
    }
  }

  public getOperationDisplay(): string {
    if (this.operator === null) {
      return this.firstOperand;
    }

    if (this.secondOperand === "") {
      return `${this.firstOperand} ${this.operator}`;
    }

    return `${this.firstOperand} ${this.operator} ${this.secondOperand}`;
  }

  public getDisplayValue(): string {
    if (this.result !== "") {
      return this.result;
    }

    return "";
  }
}
