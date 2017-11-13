// 各ブロックのid
var IDs = ["b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8"];
// ゲームのターン数最高で9（ます全て埋まった場合
var turn = 0;
// ゲームが始まっているか
var isRun = false;


function ID(id) {
  return document.getElementById(id);
}

window.onload = set;
function set() {
  for(var n = 0; n < 9; n++) {
    ID("b" + String(n)).onclick = mark;
  }
  ID("bClear").onclick = clearBoard;
  // ゲームを実行中に切り替える
  isRun = true;
}



// ユーザー側
function mark(evt) {
  if(!isRun) {
    alert("リセットボタンを押してください");
    return;
  }
  var id = evt.target.id;
  if(ID(id).innerText == "o" || ID(id).innerText == "x") {
    alert("その場所には置けません。");
    return;
  } //すでに置かれていたら置けないぞっていうメッセージを出す
  if(ID(id).innerText == "") {
    ID(id).innerText = "o";
    turn++;
  }　
  if(5 <= turn) { judge(); }
  if(isRun) { cpuMark(); }
}

// コンピュータの一手
function cpuMark() {
  // 配列IDsをシャッフルし、空いているブロックにxをおく（空いてるブロックだからおけませんはいらない）
  var len = 9;
  for(var n = 0; n < len; n++) {
    var rnd = Math.floor(Math.random() * len);
    var temp = IDs[n];
    IDs[n] = IDs[rnd];
    IDs[rnd] = temp;
  }
  
  var k = 0;
  while(k < len) {
    if(ID(IDs[k]).innerText != "o" && ID(IDs[k]).innerText != "x") {
      ID(IDs[k]).innerText = "x";
      turn++;
      break;
    }
    k++;
  }


  if(5 <= turn) { judge(); } //最短で勝負がつくのは5ターン目以降
}

// 勝敗判定
function judge() {
  // 勝ち
  if((ID("b0").innerText == "o" && ID("b1").innerText == "o" && ID("b2").innerText == "o") ||
    (ID("b3").innerText == "o" && ID("b4").innerText == "o" && ID("b5").innerText == "o") ||
    (ID("b6").innerText == "o" && ID("b7").innerText == "o" && ID("b8").innerText == "o") ||
    (ID("b0").innerText == "o" && ID("b3").innerText == "o" && ID("b6").innerText == "o") ||
    (ID("b1").innerText == "o" && ID("b4").innerText == "o" && ID("b7").innerText == "o") ||
    (ID("b2").innerText == "o" && ID("b5").innerText == "o" && ID("b8").innerText == "o") ||
    (ID("b0").innerText == "o" && ID("b4").innerText == "o" && ID("b8").innerText == "o") ||
    (ID("b2").innerText == "o" && ID("b4").innerText == "o" && ID("b6").innerText == "o")) {
      displayResult("あなたの勝ちです。", "win");
      return;
  }
  // 負け
  if((ID("b0").innerText == "x" && ID("b1").innerText == "x" && ID("b2").innerText == "x") ||
    (ID("b3").innerText == "x" && ID("b4").innerText == "x" && ID("b5").innerText == "x") ||
    (ID("b6").innerText == "x" && ID("b7").innerText == "x" && ID("b8").innerText == "x") ||
    (ID("b0").innerText == "x" && ID("b3").innerText == "x" && ID("b6").innerText == "x") ||
    (ID("b1").innerText == "x" && ID("b4").innerText == "x" && ID("b7").innerText == "x") ||
    (ID("b2").innerText == "x" && ID("b5").innerText == "x" && ID("b8").innerText == "x") ||
    (ID("b0").innerText == "x" && ID("b4").innerText == "x" && ID("b8").innerText == "x") ||
    (ID("b2").innerText == "x" && ID("b4").innerText == "x" && ID("b6").innerText == "x")) {
      displayResult("CPUの勝ちです。", "lose");
      return;
  }
  // 
  if(turn == 9) { displayResult("この勝負は引き分けです。", "draw"); }
}

// 結果の表示
function displayResult(res, cName) { 
  ID("result").innerHTML = res;
  ID("result").className = cName;
  isRun = false;
}

// マスのリセット
function clearBoard() { 
  turn = 0;
  for(var n = 0; n < 9; n++) {
    ID("b" + String(n)).innerText = "";
  }
  ID("result").innerHTML = "";
  ID("result").className = "ready";
  if(!isRun) { isRun = true; }
}
