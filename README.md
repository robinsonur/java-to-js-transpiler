# Java to JavaScript Translator

A modular code translator (transpiler) from a simple Java-like language (“Mini-Java”) to JavaScript, implemented in JavaScript.

This project demonstrates how to implement a basic language transpiler: from tokenization and parsing, to AST generation and code output.

---

## Features

* Translates Mini-Java code (variable declarations, assignments, functions, arithmetic) to JavaScript
* Modular, readable code following SOLID principles
* Clear separation between lexer, parser, AST, code generator, and IO
* Easy to extend and experiment for learning, demos, or further development

---

## Project Structure

```
java-to-js-transpiler/
├── src/
│   ├── lexer.js
│   ├── token.js
│   ├── parser.js
│   ├── abstract-syntax-tree.js
│   ├── javascript-generator.js
│   ├── file-reader.js
│   └── main.js
├── examples/
│   └── sample.mjava
├── README.md
├── package.json
```

* **`src/lexer.js`**: Lexical analyzer—converts Mini-Java source code into tokens.
* **`src/token.js`**: Token class definition.
* **`src/parser.js`**: Parses the token stream into an Abstract Syntax Tree (AST).
* **`src/abstract-syntax-tree.js`**: AST node class definitions.
* **`src/javascript-generator.js`**: Converts the AST into equivalent JavaScript code.
* **`src/file-reader.js`**: Utility class for reading files.
* **`src/main.js`**: Entry point: glues all components together.
* **`examples/sample.mjava`**: Example input file written in Mini-Java.

---

## Getting Started

### **Prerequisites**

* [Node.js](https://nodejs.org/) (version 16+ recommended)

### **Installation**

Clone the repository or download the source code:

```bash
git clone https://github.com/robinsonur/java-to-js-transpiler.git
cd java-to-js-transpiler
```

### **Running the Translator**

You can run the translator using the included start script:

```bash
npm start
```

Or directly with Node (default input is `examples/sample.mjava`):

```bash
node src/main.js
```

To translate another file:

```bash
node src/index.js path/to/your-file.mjava
```

---

## Example

**Input (`examples/sample.mjava`):**

```java
int suma(int a, int b) {
  int resultado = a + b;
  return resultado;
}

int x = 5;
int y = 2;
int z = suma(x, y);
```

**Output:**

```js
function suma(a, b) {
  let resultado = a + b;
  return resultado;
}

let x = 5;

let y = 2;

let z = suma(x, y);
```

---

## How It Works

1. **Lexical Analysis**:
   The lexer (`src/lexer.js`) reads the Mini-Java code and converts it into a sequence of tokens.

2. **Parsing**:
   The parser (`src/parser.js`) processes the token stream and constructs an Abstract Syntax Tree (AST), using class definitions from `src/abstract-syntax-tree.js`.

3. **Code Generation**:
   The JavaScript generator (`src/javascript-generator.js`) traverses the AST and produces JavaScript code.

4. **Execution**:
   The entry point (`src/main.js`) manages file input, executes the translation pipeline, and displays both the original Mini-Java code and its JavaScript output.

---

## Customization & Extension

* Modify or add AST nodes and update the code generator to support new features.
* Easily add support for more advanced statements, new types, or output formats.

---

## Author

**Robinson U. Rodríguez**
[GitHub](https://github.com/robinsonur)
