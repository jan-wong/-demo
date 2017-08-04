/**
 * 动态规划之最长公共子序列
 * author：https://github.com/jan-wong
 * description: 最优解的递归式如下,定义X、Y为两个序列，Xi、Yi分别为长度是i、j的序列，c[i, j]表示Xi、Yi的LCS的长度：
 * (1). c[i, j] = 0; 当i = 0 或者j = 0
 * (2). c[i, j] = c[i - 1, j - 1]; 当i,j>0且Xi == Yi
 * (3). c[i, j] = max(c[i - 1, j], c[i, j - 1]); 当i,j>0且Xi != Yi;
 */

// 定义两个序列X,Y
const X = ['A', 'B', 'C', 'B', 'D', 'A', 'B'];
const Y = ['B', 'D', 'C', 'A', 'B', 'A'];

// 计算LCS的长度 参数x，y为两个序列
function LCSLength(x, y) {
  const m = x.length; // x数组的长度
  const n = y.length; // y数组的长度

  // 定义b、c为两个二维数组，可以理解为长为n+1,高为m+1的矩阵
  let b = [], c = [];
  for (let i = 0; i < m + 1; i++) {
    b[i] = [];
    c[i] = [];
  }

  // c[i, j]初始化第一行，第一列全为0，因为c[i, 0] = c[0, j] 的LCS为0
  for (let i = 0; i < m + 1; i++) {
    c[i][0] = 0;
  }

  for (let i = 0; i < n + 1; i++) {
    c[0][i] = 0;
  }

  // 矩阵从1开始，对应的数组从0开始
  for (let i = 1; i < m + 1; i++) {
    for (let j = 1; j < n + 1; j++) {
      if (x[i-1] == y[j-1]) {
        c[i][j] = c[i-1][j-1] + 1; 
      } else if (c[i-1][j] >= c[i][j-1]) {
        c[i][j] = c[i-1][j];
      } else {
        c[i][j] = c[i][j-1];
      }
    }
  }

  return c;
}

// 测试
const lcstable = LCSLength(X, Y);
console.log(lcstable);  // 得到一个二维数组，c[7][6]就是LCS的长度

// 根据矩阵c[i, j]计算LCS | lcstable为lcs矩阵，x为X数组，i为x数组的长度，j为y数组的长度
function LCS(lcstable, x, y, i, j) {
  console.log(i, j);
  if (i === 0 || j === 0) return;
  if (x[i-1] == y[j-1]) {
    LCS(lcstable, x, y, i-1, j-1);
    console.log(x[i-1], y[j - 1]);
  } else if (lcstable[i-1][j] >= lcstable[i][j-1]) {
    LCS(lcstable, x, y, i-1, j);
  } else {
    LCS(lcstable, x, y, i, j-1);
  }
}

// 测试
LCS(lcstable, X, Y, 7, 6); // BCBA