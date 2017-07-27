/**
 * 栈-数据结构的实现
 * author: https://github.com/jan-wong
 * description: 利用数组来实现，它是后进先出的动态集合,理想状态下集合元素由一个对象表示，对象由其中的关键字key来区别,而其中的卫星数据随key变化
 * 缺陷: 只能对一端数据进行操作，而队列可以对两端数据进行操作
 */

// 创建一个构造函数
function Stack () {
  this._storage = []; // 初始化为一个空数组
  this.size = 0;      // 初始化数组长度为0
  this.top = null;    // 初始化栈顶为null
}

// 压入数据
Stack.prototype.push = function (data) {
  this._storage.push(data); // 把数据压入_storage属性中
  this.size++;  //_storage长度加1
  this.top = data; // 栈顶指向压入data
}

// 弹出数据
Stack.prototype.pop = function () {
  const error = '不能从空栈中弹出数据';
  if (this.size > 0) {
    this.size--;
    this.top = this._storage[this.size - 1] || null;
    return this._storage.pop(); // 弹出后进元素并返回删除元素
  }
  throw new Error(error);  // 发生下溢
}

// 清空栈所有元素
Stack.prototype.clear = function () {
  this._storage = [];
  this.size = 0;
  this.top = null;
}

// 使用
let stack1 = new Stack();
stack1.pop();  // error: 不能从空栈中弹出数据
stack1.push({ key:1, value: 'hello'});
stack1.push({ key:1, value: 'world'});
console.log(stack1.size); // size: 2
console.log(stack1.top); // { key:1, value: 'world'}