export type ValueType = "null" | "number";

export interface RuntimeValue {
  type: ValueType;
}

export interface NumberValue extends RuntimeValue {
  type: "number";
  value: number;
}
export interface NullLiteral extends RuntimeValue {
  type: "null";
  value: "null";
}
