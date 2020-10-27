onload = function () {
  Steps = ["look-up", "if-burning", "and", "if-dice1", "then-burning",
  "look-right", "if-burning", "and", "if-dice1", "then-burning", "go-button"];
  init();
};

function doAlgoStep1() {
  // logging
  run_logging();
    
  remove("hand");
  remove("go-button");

  document.getElementById("algo-step-1").style.backgroundColor =
    HIGHLIGHTED_ALGO_STEP_COLOR;

  var arrow = document.createElement("img");
  arrow.id = "arrow-up";
  arrow.className = "arrow";
  arrow.src = "https://raw.githack.com/hourofci/lessons-dev/master/beginner-lessons/computational-thinking/supplementary/arrow-up.png";
  document.getElementById("highlighted-tree").appendChild(arrow);
  animate("move-arrow-up 2s", arrow, doAlgoStep2);
}

function doAlgoStep2() {
  advanceHighlight(1, 2);

  var treeCheck = document.createElement("img");
  treeCheck.id = "tree-check";
  treeCheck.src = "https://raw.githack.com/hourofci/lessons-dev/master/beginner-lessons/computational-thinking/supplementary/check.png";
  document.getElementById("tm-tree").appendChild(treeCheck);
  fadeIn(treeCheck, doAlgoStep3);
}

function doAlgoStep3() {
  advanceHighlight(2, 3);
  setTimeout(doAlgoStep4, 2000);
}

function doAlgoStep4() {
  advanceHighlight(3, 4);
  rollDie(3, false, doAlgoStep6);
}

function doAlgoStep6() {
  advanceHighlight(4, 6);
  fadeOutAndRemove("arrow-up");
  fadeOutAndRemove("tree-check");
  fadeOutAndRemove("die");
  fadeOutAndRemove("die-x");

  var arrow = document.createElement("img");
  arrow.id = "arrow-right";
  arrow.className = "arrow";
  arrow.src = "https://raw.githack.com/hourofci/lessons-dev/master/beginner-lessons/computational-thinking/supplementary/arrow-right.png";
  document.getElementById("highlighted-tree").appendChild(arrow);
  animate("move-arrow-right 2s", arrow, doAlgoStep7);
}

function doAlgoStep7() {
  advanceHighlight(6, 7);

  var treeCheck = document.createElement("img");
  treeCheck.id = "tree-check";
  treeCheck.src = "https://raw.githack.com/hourofci/lessons-dev/master/beginner-lessons/computational-thinking/supplementary/check.png";
  document.getElementById("mr-tree").appendChild(treeCheck);
  fadeIn(treeCheck, doAlgoStep8);
}

function doAlgoStep8() {
  advanceHighlight(7, 8);
  setTimeout(doAlgoStep9, 2000);
}

function doAlgoStep9() {
  advanceHighlight(8, 9);
  rollDie(1, true, doAlgoStep10);
}

function doAlgoStep10() {
  advanceHighlight(9, 10);

  fadeOutAndRemove("arrow-right");
  fadeOutAndRemove("tree-check");
  fadeOutAndRemove("die");
  fadeOutAndRemove("die-check");

  var tree = document.createElement("div");
  tree.className = "burning tree";
  tree.style.position = "absolute";
  tree.style.border = 0;
  document.getElementById("highlighted-tree").appendChild(tree);
  fadeIn(tree, finish);
}
