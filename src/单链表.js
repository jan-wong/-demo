/**
 * 单链表-数据结构实现
 * author: https://github.com/jan-wong
 * description: 单链表由其中的各对象按顺序排列，每个节点包括关键字key、指针next，还可以包括卫星数据(也可叫辅助数据)，其中指针next指向下一个对象。
 * 链表的第一个元素叫链表的头(head),链表的最后一个元素叫链表的尾(tail).
 */

// 创建链表的节点
function LinkNode (key) {
  this.key = key;     // 节点的关键字
  this.next = null;   // next为指向下一个节点的指针
  // 此处也可以增加你喜欢的卫星数据
}

// 创建单链表
function SingleLinkList () {
  this.length = 0;    // 初始化链表的长度为0
  this.head = null;   // 初始化链表的头为null
}

// 将节点插入表头
SingleLinkList.prototype.add = function (key) {
  // 检查参数
  if (!key) {
    throw new Error('key参数是必须的');
    return;
  }

  this.length++;

  let createNode = new LinkNode(key); // 创建一个节点
  let currentNode = this.head;
  if (this.head) {    // 如果存在head,则把创建的节点作为链表头，并指向之前的连表头
    this.head = createNode;
    this.head.next = currentNode;
  } else {
    this.head = createNode;
  }
  return createNode;  
}

// 查询链表中第一个关键字为key的元素
SingleLinkList.prototype.find = function (key) {
  // 检查参数
  if (!key) {
    throw new Error('key参数是必须的');
    return;
  }

  let currentNode = this.head;
  while (currentNode && currentNode.key !== key) {  // 当存在currentNode && 其key不等于key时继续查找
    currentNode = currentNode.next;  // currentNode指向下一个节点
  }
  return currentNode;
}

// 删除第一个关键字为key的元素
SingleLinkList.prototype.remove = function (key) {
  // 检查参数
  if (!key) {
    throw new Error('key参数是必须的');
    return;
  }

  let prevNode = null;
  let currentNode = this.head;
  while (currentNode && currentNode.key !== key) {
    prevNode = currentNode;          // 把当前节点赋给prevNode
    currentNode = currentNode.next;  // 把下一节点赋给currentNode
  }

  if (!currentNode) return null;     // 如果不存在关键字为key的节点则返回null
  if (!prevNode) {                   // 如果链表的头被移除
    this.head = currentNode.next;
  } else {
    prevNode.next = currentNode.next;  // 上一个节点next指向下一个节点(包括移除链表尾)
  }

  this.length--;
  return currentNode;                // 返回被删除的节点
}

// 使用
// 1. 对空链表的操作
let linklist1 = new SingleLinkList();
let node1 = linklist1.find(1);
console.log(node1);  // 返回null
let node2 = linklist1.remove(1);
console.log(node2);  // 返回null
console.log(linklist1.length); // 0

// 2.插入和查询
let linklist2 = new SingleLinkList();
linklist2.add(2);
linklist2.add(23);
linklist2.add(2);
console.log(linklist2.head);
// { key: 2, next: { key: 23, next: { key: 2, next: null } } }
linklist2.remove(2);
console.log(linklist2.head);
// { key: 23, next: { key: 2, next: null } }