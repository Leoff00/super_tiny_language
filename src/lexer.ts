import { Token, TokenType } from "./types";

const KEYWORDS: Record<string, TokenType> = {
  null: TokenType.Null,
};

function tokenObject(type: TokenType, value: any): Token {
  return {
    type,
    value,
  };
}

function isAlphabet(input: string): boolean {
  return /[a-zA-Z]/g.test(input);
}

function isInteger(input: string): boolean {
  return /[0-9]/g.test(input);
}

function isSkippable(input: string) {
  const diff = input === " " || input === "\n" || input === "\t";
  return diff;
}

export function tokenizer(input: string): Array<Token> {
  const tokens = [] as Array<Token>;
  const src = input.split("");

  while (src.length > 0) {
    if (src[0] === "(") {
      tokens.push(tokenObject(TokenType.OpenParen, src.shift()));
    }

    if (src[0] === ")") {
      tokens.push(tokenObject(TokenType.CloseParen, src.shift()));
    }

    if (
      src[0] === "+" ||
      src[0] === "-" ||
      src[0] === "*" ||
      src[0] === "/" ||
      src[0] === "%"
    ) {
      tokens.push(tokenObject(TokenType.BinOp, src.shift()));
    }

    if (isSkippable(src[0])) src.shift();

    if (isInteger(src[0])) {
      let value = "";
      while (src.length > 0 && isInteger(src[0])) {
        value += src.shift();
      }
      tokens.push(tokenObject(TokenType.NumberLiteral, value));
    }

    //read letters like null...
    if (isAlphabet(src[0])) {
      let identifier = "";
      while (src.length > 0 && isAlphabet(src[0])) {
        identifier += src.shift();
      }

      const reserved = KEYWORDS[identifier];
      if (typeof reserved === "number") {
        tokens.push(tokenObject(reserved, identifier));
      } else {
        tokens.push(tokenObject(TokenType.Identifier, identifier));
      }
    }
  }

  tokens.push(tokenObject(TokenType.EOF, "EndOfFile"));
  return tokens;
}
