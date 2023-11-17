import { NullLiteral, NumberValue, RuntimeValue } from "./runtime";
import { BinaryExpr, NumberLiteral, Expr, Program, Node } from "./ast";

function evaluateProgram(program: Program): RuntimeValue {
  let lastEvaluated: RuntimeValue = {
    type: "null",
    value: "null",
  } as NullLiteral;

  for (const statement of program.body) {
    lastEvaluated = evaluate(statement);
    return lastEvaluated;
  }
  return lastEvaluated;
}

/**
 * Evaluaate pure numeric operations with binary operators.
 */
function evaluateNumberExpressions(
  leftHand: NumberValue,
  rightHand: NumberValue,
  operator: string
): NumberValue {
  let result: number = 0;
  const zeroInExpression = leftHand.value === 0 || rightHand.value === 0;
  switch (operator) {
    case "+": {
      result = leftHand.value + rightHand.value;
      return { type: "number", value: result };
    }
    case "-": {
      result = leftHand.value - rightHand.value;
      return { type: "number", value: result };
    }
    case "*": {
      if (zeroInExpression) {
        result = 0;
      }
      result = leftHand.value * rightHand.value;
      return { type: "number", value: result };
    }
    case "/": {
      if (zeroInExpression) {
        result = 0;
      }
      result = leftHand.value / rightHand.value;
      return { type: "number", value: result };
    }
    case "%": {
      result = leftHand.value % rightHand.value;
      return { type: "number", value: result };
    }

    default:
      return { value: result, type: "number" };
  }
}

/**
 * Evaluates expressions following the binary operation type.
 */
function evaluateBinaryExpression(binop: BinaryExpr): RuntimeValue {
  const leftHand = evaluate(binop.left);
  const rightHand = evaluate(binop.right);

  if (leftHand.type === "number" && rightHand.type === "number") {
    return evaluateNumberExpressions(
      leftHand as NumberValue,
      rightHand as NumberValue,
      binop.operator
    );
  }

  return { type: "null", value: "null" } as NullLiteral;
}

export function evaluate(astNode: Node): RuntimeValue {
  switch (astNode.kind) {
    case "NumberLiteral":
      return {
        value: (astNode as NumberLiteral).value,
        type: "number",
      } as NumberValue;
    case "NullLiteral":
      return { value: "null", type: "null" } as NullLiteral;
    case "BinaryExpression":
      return evaluateBinaryExpression(astNode as BinaryExpr);
    case "Program":
      return evaluateProgram(astNode as Program);

    default:
      console.error(
        "This AST Node has not yet been setup for interpretation.",
        astNode
      );
  }
  process.exit(0);
}
