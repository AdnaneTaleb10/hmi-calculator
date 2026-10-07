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
    if (this.firstOperand !== "" && this.secondOperand === "") {
      this.operator = operator;
    }
  }

  public calculate(): string {
    // If there is only one operand:
    if (this.firstOperand !== "" && this.operator === null) {
      this.result = this.firstOperand;
      return this.result;
    }

    if (
      this.firstOperand === "" ||
      this.operator === null ||
      this.secondOperand === ""
    ) {
      return "Error";
    }

    const first = parseFloat(this.firstOperand);
    const second = parseFloat(this.secondOperand);

    switch (this.operator) {
      case "+":
        this.result = String(first + second);
        break;

      case "-":
        this.result = String(first - second);
        break;

      case "*":
        this.result = String(first * second);
        break;

      case "/":
        if (second === 0) {
          this.result = "Cannot divide by zero";
          return this.result;
        }

        this.result = String(first / second);
        break;
    }

    return this.result;
  }

  public clear(): void {
    this.firstOperand = "";
    this.operator = null;
    this.secondOperand = "";
    this.result = "";
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

    if (this.operator !== null) {
      return this.secondOperand || "0";
    }

    return "0";
  }
}
