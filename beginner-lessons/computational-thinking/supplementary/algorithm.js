onload = function () {
  Steps = ["look-up", "if-burning", "then-burning", "go-button"];
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

  var check = document.createElement("img");
  check.id = "tree-check";
  check.src = "https://raw.githack.com/hourofci/lessons-dev/master/beginner-lessons/computational-thinking/supplementary/check.png";
  document.getElementById("tm-tree").appendChild(check);
  fadeIn(check, doAlgoStep3);
}

function doAlgoStep3() {
  advanceHighlight(2, 3);

  fadeOutAndRemove("arrow-up");
  fadeOutAndRemove("tree-check");

  var tree = document.createElement("div");
  tree.className = "burning tree";
  tree.style.position = "absolute";
  tree.style.border = 0;
  document.getElementById("highlighted-tree").appendChild(tree);
  fadeIn(tree, finish);
}
