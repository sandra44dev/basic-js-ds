const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null; // через нижнее подчеркивание, т.к. значение root зарезервировано
  }

  root() { // return root node of the tree
    return this._root;
  }

  add(data) { // add node with data to the tree

    this._root = addWithin(this._root, data); // функция начинает работать с корня

    function addWithin(node, data) {
      if (!node) { // если узел пустой, добавь туда новый узел
        return new Node(data);
      }
      if (node.data === data) { // если новое значение = значение в узле, просто верни этот узел
        return node;
      }
      if (data < node.data) { // если новое значение меньше значения в узле, добавь его как левого потомка
        node.left = addWithin(node.left, data);
      } else { // если больше, добавь его в качестве правого потомка
        node.right = addWithin(node.right, data);
      }
      return node;
    }

  }


  has(data) { // returns true if node with the data exists in the tree and false otherwise

    return addWithin(this._root, data); // функция начинает поиск с корня, передаём указатель на корень и искомое значение

    function addWithin(node, data) {
      if (!node) {  // если узел пустой, возвращаем false
        return false;
      }
      if (node.data === data) { // если значение в узле совпадает с искомым - true
        return true;
      }
      return data < node.data ? // значение в ноде больше искомого?
        addWithin(node.left, data) : // тогда продолжай искать в левом поддереве
        addWithin(node.right, data) // если меньше - ищи в правом
    }
  }

  find(data) { // returns node with the data if node with the data exists in the tree and null otherwise
    return addWithin(this._root, data);
    // функция работает как has(), но возвращает узел вместо true и null вместо false

    function addWithin(node, data) {
      if (!node) {
        return null;
      }
      if (node.data === data) {
        return node;
      }
      return data < node.data ?
        addWithin(node.left, data) :
        addWithin(node.right, data)
    }
  }

  remove(data) { // removes node with the data from the tree if node with the data exists
    this._root = removeNode(this._root, data);

    function removeNode(node, data) {
      if (!node) { // если нет узлов возвращаем null
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        //  если значение совпадает, это его надо удалить
        if (!node.left && !node.right) {
          return null;
        }

        // далее нужно заполнить образовавшийся пробел
        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        // случай если есть два ребёнка
        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;

        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min() { // returns minimal value stored in the tree (or null if tree has no nodes)
    if (!this._root) {
      return null;
    }

    let node = this._root;

    while (node.left) { // пока слева есть потомок
      node = node.left; // продолжай присваивать его значение переменной node 
    }
    return node.data; // затем верни это значение
  }

  max() { // eturns maximal value stored in the tree (or null if tree has no nodes)
    if (!this._root) {
      return null;
    }

    let node = this._root;

    while (node.right) { // пока слева есть потомок
      node = node.right; // продолжай присваивать его значение переменной node 
    }
    return node.data; // затем верни это значение
  }
}

module.exports = {
  BinarySearchTree
};