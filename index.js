import Tree from './tree.js';
import { removeDuplicates, mergeSort } from './merge-sort.js';
import buildTree from './build-tree.js';

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 55, 87];
const sortedArray = mergeSort(array);
removeDuplicates(sortedArray); // create a sorted array

const root = buildTree(sortedArray);
const tree = new Tree(root);
tree.prettyPrint(tree.root);
console.log(tree.isBalanced()); // true
console.log(tree.preOrder());
// [
//     8,  4, 1,  3,  5,
//     7, 55, 9, 23, 67,
//    87
//  ]
console.log(tree.Inorder());
// [
//     1, 3,  4,  5,  7,
//     8, 9, 23, 55, 67,
//    87
//  ]
console.log(tree.postOrder());
// [
//     3, 1,  7,  5,  4,
//    23, 9, 87, 67, 55,
//     8
//  ]
tree.insert(150);
tree.insert(200);
tree.insert(333);
tree.insert(543);
tree.prettyPrint(tree.root);
console.log(tree.isBalanced()); // false
tree.rebalance();
console.log(tree.isBalanced()); // true
tree.prettyPrint(tree.root);
console.log(tree.preOrder());
// [
//     23,   5,   3,  1,  4,  8,
//      7,   9, 150, 67, 55, 87,
//    333, 200, 543
//  ]
console.log(tree.Inorder());
// [
//     1,   3,   4,  5,  7,   8,
//     9,  23,  55, 67, 87, 150,
//   200, 333, 543
// ]
console.log(tree.postOrder());
// [
//     1,   4,  3,  7,   9,   8,
//     5,  55, 87, 67, 200, 543,
//   333, 150, 23
// ]
console.log(tree.height(tree.find(200)));
