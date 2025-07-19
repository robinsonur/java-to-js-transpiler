import { Token } from './token.js';

const KEYWORDS = ["int", "return"];
const SYMBOLS = ["(", ")", "{", "}", ";", ",", "+", "-", "*", "/", "=",];

class Lexer {
  /**
   * @param {string} input
   */
  constructor(input) {
    this.input = input;
    this.position = 0;
    this.tokens = [];
  }

  isAtEnd() {
    return this.position >= this.input.length;
  }

  peek() {
    return this.input[this.position];
  }

  advance() {
    return this.input[this.position++];
  }

  isLetter(char) {
    return /[a-zA-Z_]/.test(char);
  }

  isDigit(char) {
    return /[0-9]/.test(char);
  }

  skipWhitespace() {
    while (!this.isAtEnd() && /\s/.test(this.peek())) {
      this.advance();
    }
  }

  tokenize() {
    while (!this.isAtEnd()) {
      this.skipWhitespace();
      if (this.isAtEnd()) break;

      const char = this.peek();

      // Identifiers and Keywords
      if (this.isLetter(char)) {
        let identifier = '';
        while (!this.isAtEnd() && (this.isLetter(this.peek()) || this.isDigit(this.peek()))) {
          identifier += this.advance();
        }
        if (KEYWORDS.includes(identifier)) {
          this.tokens.push(new Token('Keyword', identifier));
        } else {
          this.tokens.push(new Token('Identifier', identifier));
        }
        continue;
      }

      // Numbers
      if (this.isDigit(char)) {
        let number = '';
        while (!this.isAtEnd() && this.isDigit(this.peek())) {
          number += this.advance();
        }
        this.tokens.push(new Token('Number', number));
        continue;
      }

      // Symbols
      if (SYMBOLS.includes(char)) {
        this.tokens.push(new Token('Symbol', this.advance()));
        continue;
      }

      // Ignore unknown chars, but could throw error here for strictness
      this.advance();
    }

    return this.tokens;
  }
}

export { Lexer };
