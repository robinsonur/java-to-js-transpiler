class JavaScriptGenerator {
  generate(node) {
    switch (node.type) {
      case 'Program':
        return node.declarations.map(d => this.generate(d)).join('\n\n');
      case 'VariableDeclaration':
        return `let ${node.name}` + (node.value ? ` = ${this.generate(node.value)}` : '') + ';';
      case 'FunctionDeclaration':
        return (
          `function ${node.name}(${node.params.map(p => p.name).join(', ')}) {\n` +
          node.body.map(stmt => '  ' + this.generate(stmt)).join('\n') +
          '\n}'
        );
      case 'ReturnStatement':
        return `return ${this.generate(node.value)};`;
      case 'Assignment':
        return `${node.name} = ${this.generate(node.value)};`;
      case 'ExpressionStatement':
        return this.generate(node.expression) + ';';
      case 'BinaryExpression':
        return `${this.generate(node.left)} ${node.operator} ${this.generate(node.right)}`;
      case 'Identifier':
        return node.name;
      case 'NumberLiteral':
        return node.value.toString();
      case 'CallExpression':
        return `${this.generate(node.callee)}(${node.arguments.map(arg => this.generate(arg)).join(', ')})`;
      default:
        throw new Error('Unknown AST node type: ' + node.type);
    }
  }
}

export { JavaScriptGenerator };
