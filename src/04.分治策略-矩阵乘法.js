/**
 * 分治策略之矩阵乘法的Strassen算法
 * author: https://github.com/jan-wong
 * description: 有两个nxn的方阵A和B，求解它们的矩阵积C, (C = A * B)
 */

// 用二维数组来表示方阵
const A = [
  [1, 2, 3, 4],
  [2, 3, 4, 5],
  [3, 4, 5, 6],
  [4, 5, 6, 7]
];
const B = [
  [4, 5, 6, 7],
  [5, 6, 7, 8],
  [6, 7, 8, 9],
  [10, 11, 12, 13]
];

// 朴素算法 时间复杂度为n的3次方
function matrixMulti(a, b) {
  let n = a.length;
  let c = [];  // 保存乘积方阵

  // 遍历方阵a的行坐标i 0-->n-1
  for (let i = 0; i < n; i++) {
    c[i] = [];
    // 遍历方阵b的列坐标j 0-->n-1
    for (let j = 0; j < n; j++) {
      c[i][j] = 0;
      
      // a的第i行k列的元素，b的k行j列元素
      for (let k = 0; k < n; k++) {
        c[i][j] += a[i][k] * b[k][j];
      }
    }
  }

  return c;
}

// 测试
let c = matrixMulti(A, B);
console.log(c); // 正确



