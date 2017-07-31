/**
 * 02.归并排序
 * author: https://github.com/jan-wong
 * description: 分治递归，子程序是从两堆已排序好的牌中摸牌排序
 * 时间复杂度：nlgn
 */

// 合并两个已排序的序列(arr是一个数组，p、q、r都是数组arr的下标，arr[p,...q]和arr[q+1,...r]是已排序的数组)
// 假设为升序
const merge = function (arr, p, q, r) {
  // 取出两个数组
  const arr1 = arr.slice(p, q + 1);
  const arr2 = arr.slice(q + 1, r + 1);

  let i = j = 0, k;
  // 从p->r遍历
  for (k = p; k < r + 1; k++) {
    if (arr1[i] && arr2[j]) {
      arr[k] = (arr1[i] <= arr2[j]) ? arr1[i++] : arr2[j++];
    } else {
      arr[k] = arr1[i] ? arr1[i++] : arr2[j++];
    }
  }
}

// 归并算法，利用了merge子程序
const mergeSort = function (arr, p, r) {
  if (p < r) {
    const q = Math.floor((p + r)/2);
    mergeSort(arr, p, q);
    mergeSort(arr, q+1, r);
    merge(arr, p, q, r);
  }
}

// 测试
const a = [3,1,2,4,3,3,5,1,2,4,5,7,1,2,3,6];
console.log(a);
merge(a, 8, 11, 15);
console.log(a);
// [ 3, 1, 2, 4, 3, 3, 5, 1, 1, 2, 2, 3, 4, 5, 6, 7 ]

const b = [3,1,2,4,3,3,5,1,2,4,5,7,1,2,3,6];
console.log(b);
mergeSort(b, 0, b.length -1);
console.log(b);
// [ 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 5, 5, 6, 7 ]