/**
 * 动态规划算法之钢条切割
 * author: https://github.com/jan-wong
 * description:
 */

let p = [1, 5, 8, 9, 10, 17, 17, 20, 24, 30, 31, 40, 50, 60, 70, 80, 90, 100, 110, 120];

/**
 * 1.朴素递归算法
 * description: 用分治的思想去求解，把问题划分为子问题递归
 * 时间复杂度为2的n次方，长度n几乎每增加1，运行时间就会翻倍
 */
let k1 = 0;
function CutRod(p, n) {
  if (n == 0) return 0;

  let q = -1;
  for (let i = 0; i < n; i++) {
    q = Math.max(q, p[i] + CutRod(p, n-i-1));
    k1++;
  }
  return q;
}

// 测试
const max = CutRod(p, 20);
console.log(max); // 120
console.log(k1);  // 1048575

/**
 * 2. 带备忘的自顶向下法
 * 时间复杂度为n的2次方
 */
let k2 = 0;
function memoCutRod(p, n) {
  let r = [];  // 备忘数组,把0-n相应输入规模的最优解存起来
  return auxCutRod(p, n, r); // 返回输入规模为n的最优解
}
function auxCutRod(p, n, r) {
  if (r[n]) return r[n];  // 如果r中存在输入规模为n的最优解，则把最优解直接返回
  let q = 0; // 最优解q初始化为0
  if (n > 0) {
    for (let i = 0; i < n; i++) {
      q = Math.max(q, p[i] + auxCutRod(p, n-i-1, r));
      k2++;
    }
  }
  r[n] = q; // 保存输入规模为n的最优解
  return q;
}

const max2 = memoCutRod(p, 20);
console.log(max2);  // 120
console.log(k2);  // 210

/**
 * 3. 自底向上方法
 * 时间复杂度为n的2次方
 */
let k3 = 0;
function bottomUpCutRod(p, n) {
  const r = [];  // 备忘数组,把0-n相应输入规模的最优解存起来
  r[0] = 0;  // 输入规模为0时，最优解为0
  // j是输入规模1-->n
  for (let j = 1; j < n + 1; j++) {
    let q = 0;
    // i 是子节点输入规模1-->j
    for(let i = 1; i < j + 1; i++) {
      q = Math.max(q, p[i-1] + r[j-i]);  // 数组p是从0开始所以i-1
      k3++;
    }
    r[j] = q;  // 依次求解输入规模为1-->n的最优解
  }
  return r[n];
}

const max3 = bottomUpCutRod(p, 20);
console.log(max3); // 120
console.log(k3); //210

/**
 * 扩展自底向上方法，不仅返回最大收益还返回最优解
 */

function bottomUpCutRodExtend(p, n) {
  const result = {};  // 返回的结果
  result.r = [];  // 备忘数组,把0-n相应输入规模的最优解存起来
  result.s = [];  // 保存钢条切割长度
  result.r[0] = result.s[0] = 0;  // 输入规模为0时，最优解为0
  // j是输入规模1-->n
  for (let j = 1; j < n + 1; j++) {
    let q = 0;
    // i 是子节点输入规模1-->j
    for(let i = 1; i < j + 1; i++) {
      if (q < p[i - 1] + result.r[j-i]) {
        q = p[i -1] + result.r[j-i];
        result.s[j] = i;
      }
    }
    result.r[j] = q;  // 依次求解输入规模为1-->n的最优解
  }
  return result;
}

// 测试
const result = bottomUpCutRodExtend(p, 20);
console.log(result);
