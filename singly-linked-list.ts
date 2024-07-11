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

  push(value: string) {
    const newNode = new ListNode(value)

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
    if (this._tail?.next) {
      this._tail.next = null
    }
    this._length--

    return previousTail
  }

  shift() {
    if (!this._head) return

    const headToRemove = this._head

    this._head = headToRemove.next
    this._length--

    if (!this._length) {
      this._tail = null
    }

    return headToRemove
  }

  unshift(value: string) {
    if (!this._head) {
      this.push(value)
    } else {
      const newNode = new ListNode(value)
      const currentHead = this._head
      // unshift
      this._head = newNode
      this._head.next = currentHead
      this._length++
    }

    return this
  }

  getNodeByNumber(fakeIndex: number) {
    if (fakeIndex < 1 || fakeIndex > this._length) return
    if (!this._head) return

    let node: TListNode = this._head
    for (let i = 1; i < fakeIndex; i++) {
      node = node.next as TListNode
    }

    return node
  }

  setValueToNodeNumber(value: string, fakeIndex: number) {
    let currentNodeAtNumber = this.getNodeByNumber(fakeIndex)
    if (!currentNodeAtNumber?.value) return

    currentNodeAtNumber.value = value

    return this
  }

  insertAtNodeNumber(value: string, fakeIndex: number) {
    if (fakeIndex === 1) {
      // insert at head
      this.unshift(value)
      return this
    }
    if (fakeIndex === this._length) {
      // insert at tail
      this.push(value)
      return this
    } else {
      // Get the node before the target node
      let previousNode = this.getNodeByNumber(fakeIndex - 1)
      // Get the target node
      let currentNode = this.getNodeByNumber(fakeIndex)

      if (!currentNode?.value) return

      const newNode = new ListNode(value)
      ;(previousNode as TListNode).next = newNode
      newNode.next = currentNode
      this._length++

      return this
    }
  }

  removeAtNodeNumber(fakeIndex: number) {
    // Get the node before the target node
    let previousNode = this.getNodeByNumber(fakeIndex - 1)
    // Get the target node
    let currentNode = this.getNodeByNumber(fakeIndex)

    // If there's no previous node, the target node is the head
    if (!previousNode) {
      // remove current head
      this.shift()
      return this
    }

    // If there's no current node or the current node has no value, it's the tail
    if (!currentNode?.value) {
      // remove current tail
      this.pop()
      return this
    }

    // else, Bypass the target node
    previousNode.next = currentNode.next
    this._length--
    return this
  }

  reverse() {
    let prevNode: TListNode | null = null
    let currentNode: TListNode | null = this._head
    let nextNode: TListNode | null = null

    while (currentNode != null) {
      nextNode = currentNode?.next
      // swap pointers
      currentNode.next = prevNode

      // for next iteration
      prevNode = currentNode
      // go to next iteration
      currentNode = nextNode
    }

    this._tail = this._head
    this._head = prevNode // "currentNode" just before last while loop iteration

    return this
  }
}

const newList = new SinglyLinkedList()
newList.push('A').push('B').push('C')
console.log('Before pop -> newList', newList)
newList.pop()
console.log('After pop -> newList', newList)
newList.unshift('D')
console.log('After unshift -> newList', newList)
console.log(newList.getNodeByNumber(2))

newList.insertAtNodeNumber('NEW_FIRST', 1)
console.log('After insertAtNodeNumber -> newList', newList)
newList.insertAtNodeNumber('NEW_LAST', newList.length)
console.log('After insertAtNodeNumber -> newList', newList)
console.log('Before reverse -> newList', newList)
newList.reverse()
console.log('After reverse -> newList', newList)
