import type { Operator } from "./types";

export class Calclator {
  private firstOperand: number | null = null;
  private operator: Operator | null = null;
  private currentInput = "";

  public inputDigit(digit: string): void {
    this.currentInput += digit;
  }

  public inputDecimal(): void {
    if (!this.currentInput.includes(".")) {
      this.currentInput += this.currentInput === "" ? "0." : ".";
    }
  }

  public setOperator(operator: Operator) {
    this.firstOperand = Number(this.currentInput);
    this.operator = operator;
    this.currentInput = "";
  }

  public calculate(): number | string {
    if (
      this.firstOperand === null ||
      this.operator === null ||
      this.currentInput === ""
    ) {
      return "Error";
    }

    const secondOperand = Number(this.currentInput);

    if (this.operator === "/" && secondOperand === 0) {
      return "Cannot divide by zero";
    }

    let result: number;

    switch (this.operator) {
      case "+":
        result = this.firstOperand + secondOperand;
        break;

      case "-":
        result = this.firstOperand - secondOperand;
        break;

      case "*":
        result = this.firstOperand * secondOperand;
        break;

      case "/":
        result = this.firstOperand / secondOperand;
        break;
    }

    this.currentInput = String(result);
    this.firstOperand = null;
    this.operator = null;

    return result;
  }

  public clear(): void {
    this.firstOperand = null;
    this.operator = null;
    this.currentInput = "";
  }

  public getDisplayValue(): string {
    return this.currentInput || "0";
  }
}
