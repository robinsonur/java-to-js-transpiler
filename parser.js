import {
  Program, VariableDeclaration, FunctionDeclaration, ReturnStatement, Assignment,
  ExpressionStatement, BinaryExpression, Identifier, NumberLiteral, CallExpression
} from './AST.js';

class Parser {
  /**
   * @param {Array<Token>} tokens
   */
  constructor(tokens) {
    this.tokens = tokens;
    this.position = 0;
  }

  peek(offset = 0) {
    return this.tokens[this.position + offset];
  }

  next() {
    return this.tokens[this.position++];
  }

  expect(type, value = undefined) {
    const token = this.next();
    if (!token || token.type !== type || (value !== undefined && token.value !== value)) {
      throw new Error(`Expected ${type} "${value}" but got ${token ? `${token.type} "${token.value}"` : "EOF"}`);
    }
    return token;
  }

  parse() {
    return this.parseProgram();
  }

  parseProgram() {
    const declarations = [];
    while (this.position < this.tokens.length) {
      if (this.peek()?.type === 'Keyword' && this.peek().value === 'int' && this.peek(2)?.value === '(') {
        declarations.push(this.parseFunctionDeclaration());
      } else if (this.peek()?.type === 'Keyword' && this.peek().value === 'int') {
        declarations.push(this.parseVariableDeclaration());
      } else {
        break;
      }
    }
    return new Program(declarations);
  }

  parseFunctionDeclaration() {
    this.expect('Keyword', 'int');
    const name = this.expect('Identifier').value;
    this.expect('Symbol', '(');
    const params = [];
    while (this.peek()?.type !== 'Symbol' || (this.peek()?.type === 'Symbol' && this.peek()?.value !== ')')) {
      if (this.peek().type === 'Keyword') {
        const paramType = this.expect('Keyword').value;
        const paramName = this.expect('Identifier').value;
        params.push({ type: paramType, name: paramName });
        if (this.peek()?.type === 'Symbol' && this.peek().value === ',') this.next();
      } else if (this.peek().type === 'Symbol' && this.peek().value === ')') {
        break;
      } else {
        throw new Error('Unexpected token in parameter list: ' + JSON.stringify(this.peek()));
      }
    }
    this.expect('Symbol', ')');
    this.expect('Symbol', '{');
    const body = [];
    while (!(this.peek()?.type === 'Symbol' && this.peek()?.value === '}')) {
      if (this.peek()?.type === 'Keyword' && this.peek().value === 'int') {
        body.push(this.parseVariableDeclaration());
      } else if (this.peek()?.type === 'Keyword' && this.peek().value === 'return') {
        this.next();
        const value = this.parseExpression();
        this.expect('Symbol', ';');
        body.push(new ReturnStatement(value));
      } else if (this.peek()?.type === 'Identifier') {
        const ident = this.expect('Identifier').value;
        if (this.peek()?.type === 'Symbol' && this.peek().value === '=') {
          this.next();
          const value = this.parseExpression();
          this.expect('Symbol', ';');
          body.push(new Assignment(ident, value));
        } else if (this.peek()?.type === 'Symbol' && this.peek().value === '(') {
          this.next();
          const args = [];
          while (this.peek()?.type !== 'Symbol' || (this.peek()?.type === 'Symbol' && this.peek()?.value !== ')')) {
            args.push(this.parseExpression());
            if (this.peek()?.type === 'Symbol' && this.peek().value === ',') this.next();
          }
          this.expect('Symbol', ')');
          this.expect('Symbol', ';');
          body.push(new ExpressionStatement(new CallExpression(new Identifier(ident), args)));
        } else {
          throw new Error("Unexpected token after identifier in function body: " + JSON.stringify(this.peek()));
        }
      } else {
        throw new Error("Unexpected token in function body: " + JSON.stringify(this.peek()));
      }
    }
    this.expect('Symbol', '}');
    return new FunctionDeclaration('int', name, params, body);
  }

  parseVariableDeclaration() {
    this.expect('Keyword', 'int');
    const name = this.expect('Identifier').value;
    let value = null;
    if (this.peek()?.type === 'Symbol' && this.peek().value === '=') {
      this.next();
      value = this.parseExpression();
    }
    this.expect('Symbol', ';');
    return new VariableDeclaration('int', name, value);
  }

  parseExpression() {
    return this.parseAddSub();
  }

  parseAddSub() {
    let left = this.parseMulDiv();
    while (this.peek()?.type === 'Symbol' && (this.peek().value === '+' || this.peek().value === '-')) {
      const op = this.next().value;
      const right = this.parseMulDiv();
      left = new BinaryExpression(left, op, right);
    }
    return left;
  }

  parseMulDiv() {
    let left = this.parsePrimary();
    while (this.peek()?.type === 'Symbol' && (this.peek().value === '*' || this.peek().value === '/')) {
      const op = this.next().value;
      const right = this.parsePrimary();
      left = new BinaryExpression(left, op, right);
    }
    return left;
  }

  parsePrimary() {
    const token = this.peek();
    if (token.type === 'Number') {
      this.next();
      return new NumberLiteral(Number(token.value));
    }
    if (token.type === 'Identifier') {
      this.next();
      if (this.peek()?.type === 'Symbol' && this.peek().value === '(') {
        this.next();
        const args = [];
        while (this.peek()?.type !== 'Symbol' || (this.peek()?.type === 'Symbol' && this.peek().value !== ')')) {
          args.push(this.parseExpression());
          if (this.peek()?.type === 'Symbol' && this.peek().value === ',') this.next();
        }
        this.expect('Symbol', ')');
        return new CallExpression(new Identifier(token.value), args);
      } else {
        return new Identifier(token.value);
      }
    }
    if (token.type === 'Symbol' && token.value === '(') {
      this.next();
      const expr = this.parseExpression();
      this.expect('Symbol', ')');
      return expr;
    }
    throw new Error("Unexpected token in expression: " + JSON.stringify(token));
  }
}

export { Parser };
