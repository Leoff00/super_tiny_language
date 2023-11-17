export enum TokenType {
  OpenParen,
  CloseParen,
  BinOp,
  NumberLiteral,
  Identifier,
  Null,
  EOF,

  //implement soon

  // BeginMelina,
  // EndMelina,
  // assignmentToken = "=",
  // comparationToken = "==",
  // notToken = "!",
  // difference = "!=",
  // LET_TOKEN = "let",
}

export interface Token {
  type: TokenType;
  value: any;
}
