import {
  NullLiteral,
  BinaryExpr,
  Expr,
  Node,
  NumberLiteral,
  Program,
  Identifier,
} from "./ast";
import { tokenizer } from "./lexer";
import { Token, TokenType } from "./types";

export class Parser {
  private tokens: Array<Token> = [];

  private notEOF(): boolean {
    return this.tokens[0].type !== TokenType.EOF;
  }

  //* returns the current position of the token
  private at(): Token {
    return this.tokens[0];
  }

  private parseStatement(): Node {
    return this.parseExpression();
  }

  private parseExpression(): Expr {
    return this.parseAdditiveExpression();
  }

  private expected(type: TokenType, error: any) {
    const prev = this.tokens.shift();

    if (!prev || prev.type !== type) {
      console.error("Parser error: \n", error, prev, "Expected: ", type);
    }
  }

  /** 
    Finds the operator that lexer mapped
    then organize the left side and the right side value
    of the operator and recursively.
  */
  private parseAdditiveExpression(): Expr {
    let left = this.parseMultiplicativeExpression();
    while (this.at().value === "+" || this.at().value === "-") {
      const operator = this.walk().value;
      const right = this.parseMultiplicativeExpression();
      left = {
        kind: "BinaryExpression",
        left,
        right,
        operator,
      } as BinaryExpr;
    }
    return left;
  }

  private parseMultiplicativeExpression() {
    let left = this.parsePrimaryExpression();

    while (
      this.at().value === "*" ||
      this.at().value === "/" ||
      this.at().value === "%"
    ) {
      const operator = this.walk().value;
      const right = this.parsePrimaryExpression();
      left = {
        kind: "BinaryExpression",
        left,
        right,
        operator,
      } as BinaryExpr;
    }
    return left;
  }

  private walk() {
    const prev = this.tokens.shift() as Token;
    return prev;
  }

  private parsePrimaryExpression(): Expr {
    const currentTokenType = this.tokens[0].type;
    switch (currentTokenType) {
      case TokenType.Null: {
        this.walk();
        return { kind: "null", value: "null" } as unknown as NullLiteral;
      }

      case TokenType.Identifier: {
        return { kind: "Identifier", symbol: this.walk().value } as Identifier;
      }

      case TokenType.NumberLiteral: {
        return {
          kind: "NumberLiteral",
          value: Number(this.walk().value),
        } as unknown as NumberLiteral;
      }
      case TokenType.OpenParen:
        this.walk();
        const value = this.parseExpression();
        this.expected(
          TokenType.CloseParen,
          "Unexpected Token found inside (). Expected )."
        );
        return value;

      default: {
        console.error("Unexpected Token ->", currentTokenType);
      }
    }
    process.exit(1);
  }

  public produceAST(input: string): Program {
    this.tokens = tokenizer(input);

    const program: Program = {
      kind: "Program",
      body: [],
    };

    // parse until EOF
    while (this.notEOF()) {
      program.body.push(this.parseStatement());
    }

    return program;
  }
}
