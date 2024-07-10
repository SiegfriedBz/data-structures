type TListNode = {
  value: string
  next: TListNode | null
}

class ListNode {
  value: string
  next: ListNode | null

  constructor(value: string) {
    this.value = value
    this.next = null
  }
}

class SinglyLinkedList {
  _head: TListNode | null
  _tail: TListNode | null
  _length: number

  constructor() {
    this._head = null
    this._tail = null
    this._length = 0
  }

  // instance methods
  // set head(node) {
  //   if (!(node instanceof ListNode)) return

  //   this._head = node
  // }

  get head() {
    return this._head
  }

  set tail(node) {
    if (!(node instanceof ListNode)) return

    this._tail = node
  }

  get tail() {
    return this._tail
  }

  get length() {
    return this._length
  }

  push(newNode: TListNode) {
    if (!this._head) {
      // set head & tail as being newNode
      this._head = newNode
      this._tail = newNode
    } else if (this._tail) {
      // set new tail as being newNode
      this._tail.next = newNode
      this._tail = newNode
    }

    // increment length
    this._length++

    // return linked list instance for chaining
    return this
  }

  pop() {
    // Return null if list is empty or has no nodes
    if (!this._head || this._length < 1) return

    // get current head
    let currentNode = this._head as TListNode

    // case length === 1
    if (this._length === 1) {
      this._head = null
      this._tail = null
      this._length = 0
      return currentNode // previous head
    }

    // else: traverse list & find node previous to tail
    let prevNode: TListNode | null = null // Track the node just before currentNode
    while (currentNode.next !== null) {
      prevNode = currentNode
      currentNode = currentNode.next as TListNode
    }

    // move current tail to prevNode
    const previousTail = this._tail
    this._tail = prevNode
    this._length--

    return previousTail
  }

  // class methods
}

const nodeA = new ListNode('A')
const nodeB = new ListNode('B')
const nodeC = new ListNode('C')

const newList = new SinglyLinkedList()
newList.push(nodeA).push(nodeB).push(nodeC)

newList.pop()
