const fs = require("fs");

const { Trie } = require("./trie");

const trie = new Trie();

/**
 * To check if the word is a concatenation of small words
 *
 * @param {String} word - word to check
 */
const prefixChecker = (word) => {
  let index = 1;

  while (index <= word.length) {
    const length = trie.find(word.substr(0, index)).length;

    if (!(length > 1) && index === 1) {
      return false;
    } else if (!(length > 1)) {
      // recursive call to prefixChecker
      return prefixChecker(word.substr(index - 1, word.length));
    } else {
      index++;
    }
  }
  return true;
};

/**
 * To find the longest string in the array
 *
 * @param {Array} arr - array of text
 */
const findLongestString = (arr) => {
  let longestString = arr.reduce(function (a, b) {
    return a.length > b.length ? a : b;
  });
  return longestString;
};

/**
 * Main function to search concatenation words
 *
 * @param {String} fileName - name of the text file
 * @param {Number} noOfResults - number of results
 */
const searchConcatWords = (fileName, noOfResults) => {
  const result = [];

  const text = fs.readFileSync(fileName, "utf-8").split("\r\n");

  // Inserting into the trie
  text.forEach((item) => {
    trie.insert(item);
  });

  // Loop to find LongestConcatStrings
  while (noOfResults) {
    let longestString = findLongestString(text);
    text.splice(text.indexOf(longestString), 1);

    if (prefixChecker(longestString)) {
      result.push(longestString);
      noOfResults--;
    }
  }

  return result;
};

// -----------------------------------------

const result1 = searchConcatWords("./words.txt", 2);

console.log(result1[0], result1[1], "\n");

const result2 = searchConcatWords("./words1.txt", 2);

console.log(result2[0], result2[1], "\n");
