import { readFileSync } from "node:fs";
import { Parser } from "./parser";
import { evaluate } from "./interpreter";
const input = readFileSync("./program.foo", { encoding: "utf-8" });

const parser = new Parser();
const program = parser.produceAST(input);
const result = evaluate(program);
console.log(result);
