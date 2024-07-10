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

const nodeA = new ListNode('A')
const nodeB = new ListNode('B')
const nodeC = new ListNode('C')

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
  set head(node) {
    if (!(node instanceof ListNode)) return

    this._head = node
  }

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

    this._length += 1
  }

  // class methods
}

const newList = new SinglyLinkedList()
newList.head = nodeA
newList.push(nodeB)
newList.push(nodeC)
console.log(newList.length)
console.log(newList.head)
console.log(newList.head.next)
console.log(newList.head.next?.next)
