# Word Composition Problem

To find words constructed by concatenating shorter words also found in the file.

## Input (files)

- words.txt
- words1.txt

## Output

```
ratcatdogcat catsdogcats

ethylenediaminetetraacetates ethylenediaminetetraacetate
```

## Approach

Used Trie data structure its a special tree that stores strings. Maximum number of children of a node is equal to size of alphabet. Trie supports search, insert and delete operations in O(k) time where k is length of key/word. This is obviously faster than BST and Hashing. and we can efficiently do Prefix search.

First `searchConcatWords` function read the file text and constructed Trie from the text/words using insert method present inside `trie.js` then used `findLongestString` function inside a loop to find the longest strings. Then `prefixChecker` function checks the string whether it was constructed using small words found in the Trie or not by checking the length of the result using find method present inside `trie.js` if greater than 1 increment the index and after loop ends return `true` If not there are two cases: (1) If the index is equal to 1 that means concat word is not found in the Trie and return `false` (2) Else it cuts the previous part and recursively call `prefixChecker` function again.

### Example of `prefixChecker` :

| Calling word       | Output                                               | Result                                           |
| ------------------ | ---------------------------------------------------- | ------------------------------------------------ |
| trie.find("c")     | `[ 'catxdogcatsrat', 'catsdogcats', 'cats', 'cat' ]` | Increment index and return `true` after loop     |
| trie.find("catsd") | `[ 'catsdogcats' ]` and `index !== 1`                | Recursive call to `prefixChecker` with `dogcats` |
| trie.find("hippo") | `[ 'hippopotamuses' ]` and `index === 1`             | Concat word not found and returns `false`        |
