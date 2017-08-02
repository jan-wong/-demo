/**
 * 分治策略之最大子数组问题
 * author: https://github.com/jan-wong
 * description: 
 */


// 查找跨中点的最大子数组
function findMaxCrossSubArr(arr, low, mid, high) {
  // 查找跨中点数组的左边最大的子数组
  let leftSum = -Infinity;  // 用来保存目前为止最大的子数组和，初始值为负无穷
  let sum = 0, maxLeft;
  for (let i = mid; i > low - 1; i--) { // 从mid-->low依次遍历
    sum += arr[i];
    if (sum > leftSum) {
      leftSum = sum;  // 更新最大子数组的和
      maxLeft = i;  //更新最大子数组的下标
    }
  }
  // 查找跨中点数组的右边最大的子数组
  rightSum = -Infinity; // 用来保存目前为止最大的子数组和，初始值为负无穷
  sum = 0;
  let maxRight;
  for (let j = mid+1; j < high + 1; j++) {  // 从mid+1-->high依次遍历
    sum += arr[j];
    if (sum > rightSum) {
      rightSum = sum; // 更新最大子数组的和
      maxRight = j; //更新最大子数组的下标
    }
  }
  return [maxLeft, maxRight, leftSum + rightSum]
}

// 查找最大子数组
function findMaxSubArr(arr, low, high) {
  // 递归的触底情况
  if (high == low) return [low, high, arr[low]];

  // 分解问题的规模
  let mid = Math.floor((low + high)/2);
  let left = findMaxSubArr(arr, low, mid);
  let right = findMaxSubArr(arr, mid + 1, high);
  let cross = findMaxCrossSubArr(arr, low, mid, high);

  if (left[2] >= right[2] && left[2] >= cross[2]) return left;
  if (right[2] >= left[2] && right[2] >= cross[2]) return right;
  return cross;
}

// 测试
const a = [13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12, -5, -22, 15, -4, 7];
const result = findMaxSubArr(a, 0, 15);
console.log(result); // [7, 10, 43]