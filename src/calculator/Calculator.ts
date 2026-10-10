import type { Operator } from "./types";

export class Calclator {
  private expression = "";
  private result = "";

  public inputDigit(digit: string): void {
    this.expression += digit;
    this.result = "";
  }

  public inputDecimal(): void {
    const currentNumber = this.expression.split(/[+\-*/]/).pop() ?? "";

    if (!currentNumber.includes(".")) {
      this.expression += currentNumber === "" ? "0." : ".";
      this.result = "";
    }
  }

  public setOperator(operator: Operator): void {
    if (this.expression === "") return;

    const lastChar = this.expression.slice(-1);

    if (/[+\-*/.]$/.test(lastChar)) {
      this.expression = this.expression.slice(0, -1);
    }

    this.expression += operator;
    this.result = "";
  }

  public calculate(): string {
    try {
      const expression = this.expression.replace(/×/g, "*");

      let position = 0;

      const parseNumber = (): number => {
        const start = position;

        while (
          position < expression.length &&
          /[\d.]/.test(expression[position])
        ) {
          position++;
        }

        const numberText = expression.slice(start, position);

        if (!/^(?:\d+\.?\d*|\.\d+)$/.test(numberText)) {
          throw new Error("Invalid number");
        }

        return Number(numberText);
      };

      const parseFactor = (): number => {
        if (expression[position] === "-") {
          position++;
          return -parseFactor();
        }

        if (expression[position] === "+") {
          position++;
          return parseFactor();
        }

        return parseNumber();
      };

      const parseTerm = (): number => {
        let value = parseFactor();

        while (expression[position] === "*" || expression[position] === "/") {
          const operator = expression[position++];
          const next = parseFactor();

          if (operator === "/") {
            if (next === 0) {
              throw new Error("Cannot divide by 0");
            }

            value /= next;
          } else {
            value *= next;
          }
        }

        return value;
      };

      const parseExpression = (): number => {
        let value = parseTerm();

        while (expression[position] === "+" || expression[position] === "-") {
          const operator = expression[position++];
          const next = parseTerm();

          value = operator === "+" ? value + next : value - next;
        }

        return value;
      };

      if (expression === "") {
        return "Error";
      }

      const calculation = parseExpression();

      if (position !== expression.length || !Number.isFinite(calculation)) {
        throw new Error("Invalid expression");
      }

      this.result = this.formatResult(calculation);
      return this.result;
    } catch (error) {
      this.result =
        error instanceof Error && error.message === "Cannot divide by 0"
          ? "Cannot divide by 0"
          : "Error";

      return this.result;
    }
  }

  private formatResult(value: number): string {
    const result = Number.isInteger(value)
      ? String(value)
      : parseFloat(value.toFixed(3)).toString();

    return result.length > 10 ? value.toExponential(3) : result;
  }

  public getOperationDisplay(): string {
    return this.expression;
  }

  public getDisplayValue(): string {
    return this.result;
  }

  public clear(): void {
    this.expression = "";
    this.result = "";
  }

  public deleteLast(): void {
    this.expression = this.expression.slice(0, -1);
    this.result = "";
  }
}
