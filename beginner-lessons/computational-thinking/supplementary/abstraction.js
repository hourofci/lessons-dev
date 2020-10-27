onload = function () {
  init();
  Steps = ["look", "direction", "if-burning", "and", "if-dice1",
    "then-burning", "save-button"];
  fadeOutAndRemove("look-group-1");
  var lookGroup2 = document.getElementById("look-group-2");
  fadeIn(lookGroup2, function () {
    lookGroup2.style.opacity = 1;
    lookGroup2.style.position = "relative";
    document.getElementById("hand").style.display = "block";
  });
};

function save() {
  remove("hand");
  fadeOutAndRemove("algo-steps");
  var algorithmArea = document.getElementById("algorithm-area");
  algorithmArea.style.height = "269px";
  animate("collapse-function 2s", algorithmArea, moveFunctionIntoPlace);
}

function moveFunctionIntoPlace() {
   var algorithmArea = document.getElementById("algorithm-area");
   algorithmArea.style.border = "1px solid black";
   algorithmArea.style.height = "36px";
   algorithmArea.style.padding = "10px";
   algorithmArea.style.width = "255px";
   // Needs to be a small delay or the animation ending callback gets confused
    setTimeout(function () {
      fadeOutAndRemove("algorithm-area");
    }, 0);
  
  var tryBurn = document.createElement("try-burn");
  tryBurn.id = "try-burn";
  tryBurn.className = "block function";
  tryBurn.innerHTML = "TRY BURN ";

  var direction = document.createElement("div");
  direction.id = "direction";
  direction.className = "var block";
  direction.innerHTML = "DIRECTION";
  direction.style.pointerEvents = "none";
  tryBurn.appendChild(direction);
  document.getElementById("block-area").appendChild(tryBurn);

  fadeIn(tryBurn, setUpAlgorithm);
}

function setUpAlgorithm() {
  init();
  NextStep = 1;
  Steps = ["try-burn", "up", "try-burn", "down", "try-burn", "left",
    "try-burn", "right", "go-button"];

  var algorithmArea = document.createElement("div");
  algorithmArea.id = "algorithm-area";
  algorithmArea.className = "bottom-row";
  var algoSteps = document.createElement("div");
  algoSteps.id = "algo-steps";
  var algoStep1 = document.createElement("div");
  algoStep1.id = "algo-step-1";
  algoStep1.innerHTML = "1.";
  algoSteps.appendChild(algoStep1);
  algorithmArea.appendChild(algoSteps);
  document.body.insertBefore(algorithmArea,
    document.getElementById("go-button"));
  fadeIn(algorithmArea, showHand);
}

function showHand() {
  var hand = document.createElement("img");
  hand.id = "hand";
  hand.src = "https://raw.githack.com/hourofci/lessons-dev/master/beginner-lessons/computational-thinking/supplementary/hand.png";
  hand.style.display = "block";
  document.getElementById("try-burn").appendChild(hand);
}

function doAlgoStep1a() {
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
  animate("move-arrow-up 2s", arrow, doAlgoStep1b);
}

function doAlgoStep1b() {
  var treeCheck = document.createElement("img");
  treeCheck.id = "tree-check";
  treeCheck.src = "https://raw.githack.com/hourofci/lessons-dev/master/beginner-lessons/computational-thinking/supplementary/check.png";
  document.getElementById("tm-tree").appendChild(treeCheck);
  fadeIn(treeCheck, doAlgoStep1c);
}

function doAlgoStep1c() {
  rollDie(3, false, doAlgoStep2a);
}

function doAlgoStep2a() {
  advanceHighlight(1, 2);

  fadeOutAndRemove("arrow-up");
  fadeOutAndRemove("tree-check");
  fadeOutAndRemove("die");
  fadeOutAndRemove("die-x");

  var arrow = document.createElement("img");
  arrow.id = "arrow-down";
  arrow.className = "arrow";
  arrow.src = "https://raw.githack.com/hourofci/lessons-dev/master/beginner-lessons/computational-thinking/supplementary/arrow-down.png";
  document.getElementById("highlighted-tree").appendChild(arrow);
  animate("move-arrow-down 2s", arrow, doAlgoStep2b);
}

function doAlgoStep2b() {
  var treeX = document.createElement("img");
  treeX.id = "tree-x";
  treeX.src = "https://raw.githack.com/hourofci/lessons-dev/master/beginner-lessons/computational-thinking/supplementary/x.png";
  document.getElementById("bm-tree").appendChild(treeX);
  fadeIn(treeX, doAlgoStep3a);
}

function doAlgoStep3a() {
  advanceHighlight(2, 3);

  fadeOutAndRemove("arrow-down");
  fadeOutAndRemove("tree-x", doAlgoStep3a2);
}

function doAlgoStep3a2() {
  var arrow = document.createElement("img");
  arrow.id = "arrow-left";
  arrow.className = "arrow";
  arrow.src = "https://raw.githack.com/hourofci/lessons-dev/master/beginner-lessons/computational-thinking/supplementary/arrow-left.png";
  document.getElementById("highlighted-tree").appendChild(arrow);
  animate("move-arrow-left 2s", arrow, doAlgoStep3b);
}

function doAlgoStep3b() {
  var treeX = document.createElement("img");
  treeX.id = "tree-x";
  treeX.src = "https://raw.githack.com/hourofci/lessons-dev/master/beginner-lessons/computational-thinking/supplementary/x.png";
  document.getElementById("ml-tree").appendChild(treeX);
  fadeIn(treeX, doAlgoStep4a);
}

function doAlgoStep4a() {
  advanceHighlight(3, 4);

  fadeOutAndRemove("arrow-left");
  fadeOutAndRemove("tree-x");

  var arrow = document.createElement("img");
  arrow.id = "arrow-right";
  arrow.className = "arrow";
  arrow.src = "https://raw.githack.com/hourofci/lessons-dev/master/beginner-lessons/computational-thinking/supplementary/arrow-right.png";
  document.getElementById("highlighted-tree").appendChild(arrow);
  animate("move-arrow-right 2s", arrow, doAlgoStep4b);
}

function doAlgoStep4b() {
  var treeCheck = document.createElement("img");
  treeCheck.id = "tree-check";
  treeCheck.src = "https://raw.githack.com/hourofci/lessons-dev/master/beginner-lessons/computational-thinking/supplementary/check.png";
  document.getElementById("mr-tree").appendChild(treeCheck);
  fadeIn(treeCheck, doAlgoStep4c);
}

function doAlgoStep4c() {
  rollDie(1, true, doAlgoStep4d);
}

function doAlgoStep4d() {
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
