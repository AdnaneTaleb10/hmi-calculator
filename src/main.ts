import "./style.css";

import { Calclator } from "./calculator/Calculator";
import { CalclatorUI } from "./ui/CalculatorUI";

const calculator = new Calclator();

new CalclatorUI(calculator);
