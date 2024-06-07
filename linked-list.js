/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  _getNode(idx) {
    let currentNode = this.head;
    let count = 0;

    while (currentNode !== null && count != idx) {
      count++;
      currentNode = currentNode.next;
    }

    return currentNode;
  }

  _getPreviousNode(idx){
    if (!this._get(idx - 1)){
      throw new Error('No Previous Index');
    }

    return this._getNode(idx - 1);
  }

  _isIndexValid(idx){
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }
    
    return true;
  }


  push(val) {
    let newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    
    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;    
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
  }

  /** pop(): return & remove last item. */

  pop() {
    return this.removeAt(this.length - 1);
  }

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(this.length - 1);
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {

    this._isIndexValid(idx);
    return this._getNode(idx).val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {

    this._isIndexValid(idx);
    this._getNode(idx).val = val
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    this._isIndexValid(idx);

    if (idx === 0) {
      return this.unshift(val);
    }
    if (idx === this.length) {
      return this.push(val);
    }

    let newNode = new Node(val);
    let previousNode = this._getPreviousNode(val);
    newNode.next = previousNode.next;
    previousNode.next = newNode;

    this.length++;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx > this.length || idx < 0){
      throw new Error('Invalid Index')
    }

    // Remove Head
    if (idx === 0){
      let val = this.head.val;
      this.head = this.head.next;
      this.length--;
      
      if (this.length < 1){
        this.head = this.tail;
        }
      return val;
    }

    // Remove Tail
    if (idx === this.length - 1){
      let val = this.tail;
      this.tail = this._getPreviousNode(this.tail);
      this.tail.next = null;
      this.length--;
      return val;
    }

    // Otherwise
    let val = this._getNode(idx).val;
    this._getPreviousNode(idx).next = value.next;
    this.length--;
    return value;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0){
      return 0;
    }

    let sum = 0;
    let currentNode = this.head

    while (currentNode) {
      sum += currentNode.val;
      currentNode = currentNode.next;
    }

    return sum / this.length;
  }
}

module.exports = LinkedList;

