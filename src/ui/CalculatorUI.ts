import type { Operator } from "../calculator/types";
import type { Calclator } from "../calculator/Calculator";

export class CalclatorUI {
  private readonly calculator: Calclator;

  private readonly topDisplay: HTMLElement;
  private readonly bottomDisplay: HTMLElement;
  private readonly buttons: NodeListOf<HTMLButtonElement>;
  private readonly keypressSound: HTMLAudioElement;

  constructor(calculator: Calclator) {
    this.calculator = calculator;
    this.topDisplay = document.querySelector(".top")!;
    this.bottomDisplay = document.querySelector(".bottom")!;
    this.buttons = document.querySelectorAll("button");
    this.keypressSound = new Audio("/sound/keystroke.wav");

    this.attachEventListener();
    this.updateDisplay();
    this.handleInfinity();
  }

  private attachEventListener(): void {
    this.buttons.forEach((button) => {
      button.addEventListener("click", () => {
        this.handleButtonClick(button);
      });
    });
  }

  private handleButtonClick(button: HTMLButtonElement): void {
    const value = button.dataset.value;

    if (!value) {
      return;
    }

    this.playSound();

    if (button.classList.contains("number")) {
      if (value === ".") {
        this.calculator.inputDecimal();
      } else {
        this.calculator.inputDigit(value);
      }
    }

    if (button.classList.contains("operator")) {
      this.calculator.setOperator(value === "×" ? "*" : (value as Operator));
    }

    if (value === "=") {
      this.calculator.calculate();
    }

    if (value === "C") {
      this.calculator.clear();
    }

    if (value === "DEL") {
      this.calculator.deleteLast();
    }

    this.updateDisplay();
    this.handleInfinity();
  }

  private handleInfinity(): void {
    if (this.calculator.getDisplayValue() !== "Infinity") {
      return;
    }

    setTimeout(() => {
      this.calculator.clear();
      this.updateDisplay();
    }, 700);
  }

  private playSound(): void {
    this.keypressSound.currentTime = 0;
    this.keypressSound.play();
  }

  private updateDisplay(): void {
    this.topDisplay.textContent = this.calculator.getOperationDisplay();

    this.bottomDisplay.textContent = this.calculator.getDisplayValue();
  }
}
