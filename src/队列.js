/**
 * 队列-数据结构的实现
 * author: https://github.com/jan-wong
 * description: 利用数组来实现，队列是一个先进先出的动态集合，类似于去银行排队办理业务，先到先办理。
 * 它比栈的优势是可以对集合两端数据进行处理
 */

// 实现一个没有数量限制的队列
function Queue () {
  this._storage = []; // 定义为一个数组
  this._head = 0;      // 定义队头，始终为0，指向队头元素
  this._tail = 0;      // 定义队尾，指向将要插入新元素的位置，如果_head=_tail,则队列为空
  this.size = 0;      // 初始化队列长度
}

// 入队
Queue.prototype.enqueue = function (data) {
  this._storage.push(data);
  this._tail++;
  this.size++;
}

// 出队
Queue.prototype.dequeue = function () {
  const error = '此队列为空';
  if (this.size > 0) {
    this._tail--;
    this.size--;
    return this._storage.shift();
  }
  throw new Error(error); // 发生下溢
}

// 使用
let queue = new Queue();
queue.enqueue(10);
queue.enqueue(29);
queue.dequeue();
console.log(queue.size);