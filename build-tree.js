import Node from './node.js';

export default function buildTree(array, start = 0, end = array.length - 1) {
  if (start > end) return null;
  const mid = Math.floor((start + end) / 2);
  const node = new Node(array[mid]);
  node.left = buildTree(array, start, mid - 1);
  node.right = buildTree(array, mid + 1, end);
  return node;
}
