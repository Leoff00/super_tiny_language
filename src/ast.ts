export type NodeType =
  | "Program"
  | "NumberLiteral"
  | "BinaryExpression"
  | "Identifier"
  | "NullLiteral";

export interface Node {
  kind: NodeType;
}

export interface Expr extends Node {}

export interface Program extends Node {
  kind: "Program";
  body: Array<Node>;
}

export interface BinaryExpr extends Node {
  left: Expr;
  right: Expr;
  operator: string;
}

export interface Identifier extends Expr {
  kind: "Identifier";
  symbol: string;
}

export interface NumberLiteral extends Expr {
  kind: "NumberLiteral";
  value: number;
}

export interface NullLiteral extends Expr {
  kind: "NullLiteral";
  value: "null";
}
