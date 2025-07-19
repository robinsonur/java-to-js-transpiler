import fs from 'fs';

class FileReader {
  /**
   * @param {string} filePath
   * @returns {string}
   */
  static read(filePath) {
    return fs.readFileSync(filePath, 'utf-8');
  }
}

export { FileReader };
