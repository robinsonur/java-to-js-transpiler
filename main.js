import path from 'path';
import { FileReader } from './file-reader.js';
import { Lexer } from './lexer.js';
import { Parser } from './parser.js';
import { JavaScriptGenerator } from './javascript-generator.js';

const examplePath = process.argv[2] || path.resolve('examples/sample.mjava');
const sourceCode = FileReader.read(examplePath);

try {
  const lexer = new Lexer(sourceCode);
  const tokens = lexer.tokenize();
  const parser = new Parser(tokens);
  const ast = parser.parse();
  const jsGenerator = new JavaScriptGenerator();
  const jsCode = jsGenerator.generate(ast);

  console.log('--- Input (Mini-Java) ---\n' + sourceCode);
  console.log('\n--- Translated to JavaScript ---\n' + jsCode);
} catch (error) {
  console.error('Translation Error:', error.message);
}
