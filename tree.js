import Node from './node.js';
import buildTree from './build-tree.js';

export default class Tree {
  constructor(root = null) {
    this.root = root;
  }

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  insert(value, root = this.root) {
    if (root === null) {
      this.root = new Node(value);
      return;
    }

    if (value < root.data) {
      if (root.left === null) {
        root.left = new Node(value);
      } else {
        this.insert(value, root.left);
      }
    } else if (value > root.data) {
      if (root.right === null) {
        root.right = new Node(value);
      } else {
        this.insert(value, root.right);
      }
    }
  }

  deleteItem(value, root = this.root) {
    if (root === null) {
      return root;
    }

    if (value < root.data) {
      root.left = this.deleteItem(value, root.left);
      return root;
    } else if (value > root.data) {
      root.right = this.deleteItem(value, root.right);
      return root;
    }

    if (root.left === null) {
      let temp = root.right;
      return temp;
    } else if (root.right === null) {
      let temp = root.left;
      return temp;
    } else {
      let succParent = root;
      let succ = root.right;

      while (succ.left !== null) {
        succParent = succ;
        succ = succ.left;
      }

      if (succParent !== root) succParent.left = succ.right;
      else succParent.right = succ.right;

      root.data = succ.data;
      return root;
    }
  }

  find(value, root = this.root) {
    if (root === null) return root;
    if (value < root.data) return this.find(value, root.left);
    else if (value > root.data) return this.find(value, root.right);
    else return root;
  }

  levelOrder(callback, queue = [this.root], temp = []) {
    if (this.root === null) return;
    if (queue.length === 0) return temp;
    let currentNode = queue.shift();
    if (callback) {
      let result = callback(currentNode.data);
      temp.push(result);
    } else {
      temp.push(currentNode.data);
    }
    if (currentNode.left !== null) queue.push(currentNode.left);
    if (currentNode.right !== null) queue.push(currentNode.right);

    return this.levelOrder(callback, queue, temp);

    // ITERATIVE approach
    // if (this.root === null) return;
    // let queue = [];
    // let temp = [];
    // queue.push(this.root);

    // while (queue.length !== 0) {
    //   let currentNode = queue[0];
    //   if (callback) {
    //     let result;
    //     result = callback(currentNode.data);
    //     temp.push(result);
    //   } else temp.push(currentNode.data);
    //   if (currentNode.left !== null) queue.push(currentNode.left);
    //   if (currentNode.right !== null) queue.push(currentNode.right);
    //   queue.shift();
    // }

    // return temp;
  }

  preOrder(callback, root = this.root, temp = []) {
    if (root === null) return;
    if (callback) temp.push(callback(root.data));
    else temp.push(root.data);
    this.preOrder(callback, root.left, temp);
    this.preOrder(callback, root.right, temp);
    return temp;
  }

  Inorder(callback, root = this.root, temp = []) {
    if (root === null) return;
    this.Inorder(callback, root.left, temp);
    if (callback) temp.push(callback(root.data));
    else temp.push(root.data);
    this.Inorder(callback, root.right, temp);
    return temp;
  }

  postOrder(callback, root = this.root, temp = []) {
    if (root === null) return;
    this.postOrder(callback, root.left, temp);
    this.postOrder(callback, root.right, temp);
    if (callback) temp.push(callback(root.data));
    else temp.push(root.data);
    return temp;
  }

  height(node) {
    if (node == null) return -1;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    const height = Math.max(leftHeight, rightHeight) + 1;
    return height;
  }

  depth(node, root = this.root) {
    if (root === null || node === null) return -1;
    let depth = 0;
    while (root.data !== node.data) {
      if (node.data < root.data) root = root.left;
      else if (node.data > root.data) root = root.right;
      depth += 1;
    }
    return depth;
  }

  isBalanced(root = this.root) {
    if (root == null) return true;
    const leftSubTreeNode = root.left;
    const rightSubTreeNode = root.right;
    const leftSubTreeHeight = this.height(leftSubTreeNode);
    const rightSubTreeHeight = this.height(rightSubTreeNode);
    const heightDifference = Math.abs(leftSubTreeHeight - rightSubTreeHeight);
    if (
      heightDifference <= 1 &&
      this.isBalanced(root.left) &&
      this.isBalanced(root.right)
    )
      return true;
    return false;
  }

  rebalance() {
    const array = this.Inorder();
    const root = buildTree(array);
    this.root = root;
  }

  add(value) {
    return (value += 1);
  }
}
