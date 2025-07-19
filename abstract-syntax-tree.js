class Program {
  /**
   * @param {Array} declarations
   */
  constructor(declarations) {
    this.type = 'Program';
    this.declarations = declarations;
  }
}

class VariableDeclaration {
  constructor(varType, name, value) {
    this.type = 'VariableDeclaration';
    this.varType = varType;
    this.name = name;
    this.value = value;
  }
}

class FunctionDeclaration {
  constructor(returnType, name, params, body) {
    this.type = 'FunctionDeclaration';
    this.returnType = returnType;
    this.name = name;
    this.params = params; // Array of { type, name }
    this.body = body;     // Array of statements
  }
}

class ReturnStatement {
  constructor(value) {
    this.type = 'ReturnStatement';
    this.value = value;
  }
}

class Assignment {
  constructor(name, value) {
    this.type = 'Assignment';
    this.name = name;
    this.value = value;
  }
}

class ExpressionStatement {
  constructor(expression) {
    this.type = 'ExpressionStatement';
    this.expression = expression;
  }
}

class BinaryExpression {
  constructor(left, operator, right) {
    this.type = 'BinaryExpression';
    this.left = left;
    this.operator = operator;
    this.right = right;
  }
}

class Identifier {
  constructor(name) {
    this.type = 'Identifier';
    this.name = name;
  }
}

class NumberLiteral {
  constructor(value) {
    this.type = 'NumberLiteral';
    this.value = value;
  }
}

class CallExpression {
  constructor(callee, args) {
    this.type = 'CallExpression';
    this.callee = callee;
    this.arguments = args;
  }
}

export {
  Program,
  VariableDeclaration,
  FunctionDeclaration,
  ReturnStatement,
  Assignment,
  ExpressionStatement,
  BinaryExpression,
  Identifier,
  NumberLiteral,
  CallExpression,
};
