/**
 * Nodes of the Trie
 */
function TrieNode(key) {
  this.key = key;
  this.parent = null;
  this.children = {};
  this.end = false;
}

/**
 * Insertion Function
 * TC: O(k), k = word length
 *
 * @param {String} word - To Insert
 */
Trie.prototype.insert = function (word) {
  let node = this.root;

  for (let index = 0; index < word.length; index++) {
    if (!node.children[word[index]]) {
      node.children[word[index]] = new TrieNode(word[index]);
      node.children[word[index]].parent = node;
    }
    node = node.children[word[index]];

    if (index === word.length - 1) {
      node.end = true;
    }
  }
};

/**
 * Get Words Function
 * TC: O(k), k = word length
 */
TrieNode.prototype.getWord = function () {
  const output = [];
  let node = this;

  while (node !== null) {
    output.unshift(node.key);
    node = node.parent;
  }

  return output.join("");
};

/**
 * Find All Words
 *
 * @param {Object} node - Trie node
 * @param {Array} arr - Resultant Array
 */
const findAllWords = (node, arr) => {
  if (node.end) arr.unshift(node.getWord());

  for (let child in node.children) {
    findAllWords(node.children[child], arr);
  }
};

/**
 * Find by prefix
 * TC: O(p + n), p = prefix length, n = number of child
 *
 * @param {String} prefix - Prefix string
 */
Trie.prototype.find = function (prefix) {
  let node = this.root;
  const output = [];

  for (let index = 0; index < prefix.length; index++) {
    if (node.children[prefix[index]]) {
      node = node.children[prefix[index]];
    } else {
      return output;
    }
  }
  findAllWords(node, output);

  return output;
};

/**
 * Trie
 */
function Trie() {
  this.root = new TrieNode(null);
}

module.exports = { Trie };
