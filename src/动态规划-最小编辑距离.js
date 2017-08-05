/**
 * 动态规划之最小编辑距离
 * author: https://github.com/jan-wong
 * description: 如果存在一系列操作可以使一个字符串从X变成字符串Y，这些操作包括插入字符(insert)、
 * 删除字符(remove)等等，那么这些最小操作次数被称为最小编辑距离。
 * 可以令c[i, j]这个矩阵表示最小编辑距离，在js中用二维数组表示，有如下递归式：
 * 
 * c[i, j] = min(c[i-1, j] + 1, c[i, j-1] + 1); 当i>0且j>0,Xi!=Yi;
 * c[i, j] = c[i-1, j-1]; 当i>0且j>0,Xi == Yj;
 * 注意：本实例只包括insert、remove两个操作来演示，其他操作也雷同
 */

// 定义两个序列，可以用数组表示也可以用字符串表示，都一样的原理
const alist = ['X', 'G', 'Y', 'X', 'Y', 'X', 'Y', 'X'];
const blist = ['X', 'Y', 'X', 'Y', 'X', 'Y', 'T', 'X'];

// 最小编辑距离算法，参数为两个序列，返回编辑距离矩阵
function editDistance(a, b) {
  const alen = a.length;
  const blen = b.length;

  // 初始化 alen+1 行 blen+1 列的 c 矩阵，
  // 需要注意的是c[i, 0] = i,c [0, j] = j;
  const c = [];
  for(let i=0; i<alen+1; i++) {
    c[i] = [];
    c[i][0] = i;
  }
  for(let j=0; j<blen+1; j++) {
    c[0][j] = j;
  }

  // 按照递归式进行运算
  for (let i=1; i<alen+1; i++) {
    for (let j=1; j<blen+1; j++) {
      if (a[i-1] === b[j-1]) {
        c[i][j] = c[i-1][j-1];
      } else if (c[i-1][j] >= c[i][j-1]) {
        c[i][j] = c[i][j-1] + 1;
      } else {
        c[i][j] = c[i-1][j] + 1;
      }
    }
  }

  return c;
}

// 测试
const res = editDistance(alist, blist);
console.log(res); // 最小编辑距离为c[8][8] = 2

// 既然得到了一个编辑距离矩阵，接下来就需要知道从序列alist到底是经过怎样的操作得到序列blist

function getMoves(c, a, b) {
  const moves = [];

  let i = a.length + 1;
  let j = b.length + 1;
  (function mapMatrix() {
    if (i ===0 && j === 0) return false;
    if (a[i-1] === b[j-1]) {
      i--;
      j--;
    } else if (c[i-1][j] >= c[i][j-1]){
      moves.push({
        type: 'insert',
        index: i,
        item: b[j-1]
      })
      j--;
    } else {
      moves.push({
        type: 'remove',
        index: i-1
      })
      i--;
    }
    mapMatrix();
  })();
  return moves;
}

// 测试
const moves = getMoves(res, alist, blist);
console.log(moves);

// 既然得到了最小操作moves,就可以从alist 通过moves操作变为 blist了
function patch(a, moves) {
  const acopy = a.slice(0);
  moves.forEach(function(obj) {
    if (obj.type === 'insert') {
      acopy.splice(obj.index, 0, obj.item);
    }
    if (obj.type === 'remove') {
      acopy.splice(obj.index, 1);
    }
  });

  return acopy;
}

// 测试
const newList = patch(alist, moves);
console.log(alist);
console.log(newList);
console.log(blist);
