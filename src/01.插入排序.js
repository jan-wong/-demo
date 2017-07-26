/**
 * 01.插入排序
 * author: https://github.com/jan-wong
 * introduce: 类似于斗地主摸牌排序
 */

// 需要排序的牌
let unsort = [5, 2, 4, 6, 1, 3];

// 插入排序函数（升序）
const insertionSort = function (arr) {
  // 下标j是正要被插入左手中的牌的下标,从第二张开始才能比较大小
  for(var j=1; j<arr.length; j++) {
    let key = arr[j]; // key为当前牌的大小
    let i = j - 1; // 此时下标i为左手最后一张牌的下标

    // 把右手的牌和左手排好序的牌从右到左依次比较，直到遇到比他小或者比较完
    while(i>=0 && key<arr[i]) { // i为被比较的牌的下标 i+1位置被空出来
      arr[i+1] = arr[i]; // 比当前牌大，就移动到下一位
      --i;
    }

    arr[i+1] = key; // 把右手的牌插入被空出来的位置
  }
}

insertionSort(unsort);
console.log(unsort); // 输出 [ 1, 2, 3, 4, 5, 6 ]

