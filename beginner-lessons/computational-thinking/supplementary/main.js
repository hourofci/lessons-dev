var HIGHLIGHTED_ALGO_STEP_COLOR = "rgb(0, 114, 178)";
var NextStep = 1;
var Steps;

function advanceDie(current, result, isSuccessful, callback) {
  var check, dieObj, next, x;
  if (current == result) {
    dieObj = document.getElementById("dice-result");
    if (isSuccessful) {
      check = document.createElement("img");
      check.id = "die-check";
      check.src = "https://raw.githack.com/hourofci/lessons-dev/master/beginner-lessons/computational-thinking/supplementary/check.png";
      dieObj.appendChild(check);
      fadeIn(check, callback);
    }
    else {
      x = document.createElement("img");
      x.id = "die-x";
      x.src = "https://raw.githack.com/hourofci/lessons-dev/master/beginner-lessons/computational-thinking/supplementary/x.png";
      dieObj.appendChild(x);
      fadeIn(x, callback);
    }
  }
  else {
    switch (current) {
      case 2:
        next = 6;
        break;
      case 6:
        next = (result == 1) ? 3 : 1;
        break;
      case 1:
      case 3:
        next = result;
        break;
    }
    setTimeout(function () {
      document.getElementById("die").style.backgroundImage =
        "url(https://raw.githack.com/hourofci/lessons-dev/master/beginner-lessons/computational-thinking/supplementary/dice" + next + ".png)";
      advanceDie(next, result, isSuccessful, callback);
    }, 250);
  }
}

function advanceHighlight(prev, next) {
  document.getElementById("algo-step-" + prev).style.backgroundColor = "";
  document.getElementById("algo-step-" + next).style.backgroundColor =
    HIGHLIGHTED_ALGO_STEP_COLOR;
}

function animate(animation, element, callback) {
  element.style.animation = animation;
  element.style.webkitAnimation = animation;
  if (typeof callback === "function") {
    var f = function () {
      callback();
      element.removeEventListener("animationend", f);
      element.removeEventListener("webkitAnimationEnd", f);
    };
    element.addEventListener("animationend", f);
    element.addEventListener("webkitAnimationEnd", f);
  }
}

function fadeIn(element, callback) {
  animate("fade-in 2s", element, callback);
}

function fadeOut(id, callback, parent) {
  var element = document.getElementById(id);
  animate("fade-out 2s", element, callback);
}

function fadeOutAndRemove(id, eventListener) {
  var element = document.getElementById(id);
  var f = function () {
    remove(id);
    if (typeof eventListener === "function") {
      eventListener();
    }
  };
  fadeOut(id, f);
}

function finish() {
  document.getElementById("algo-step-" + (Steps.length - 1)).style.
    backgroundColor = "";
  var overlay = document.getElementById("overlay");
  overlay.style.display = "block";
  fadeIn(overlay);
}

function handleClickOnBlock(evt) {
  // Ignore click if it's not time to click on that block yet
  if (evt.target.id != Steps[NextStep - 1]) {
    return;
  }

  // Hide the hand, but keep it around so we can put it somewhere else
  var hand = remove("hand");

  // Figure out if the block is a variable block 
  var isVar = (evt.target.className.indexOf("var") > -1);

  // Figure out if the previous block was a function block
  var wasFunc = (NextStep > 1 && 
    document.getElementById(Steps[NextStep - 2]).className.indexOf("function")
    > -1);

  // Figure out if the current block is a function block
  var isFunc = (NextStep > 0 && 
    document.getElementById(Steps[NextStep - 1]).className.indexOf("function")
    > -1);

  // Create a new block to put in the algorithm area
  var newAlgoBlock = document.createElement("div");
  newAlgoBlock.className = "block";
  if (isVar) {
    newAlgoBlock.className += " var";
  }
  if (Steps[NextStep - 1] == "try-burn") {
    newAlgoBlock.className += " function";
  }
  newAlgoBlock.innerHTML = evt.target.innerHTML;

  // Figure out which algorithm step to add the block to
  var parentElement = document.getElementById("algo-step-" + NextStep);
  if (isVar) {
    parentElement = document.getElementById("algo-step-" + (NextStep - 1));
  }
  if (wasFunc) {
    var step = document.getElementById("algo-step-" + (NextStep - 1));
    parentElement = step.children[0];
    var c = parentElement.children[0];
    parentElement.removeChild(c);
  }
  parentElement.appendChild(newAlgoBlock);

  //// Move on to the next step

  // If the block is a variable block, remove it from the list of steps so that
  // the step numbering is consistent
  if (isVar) {
    Steps.splice(NextStep - 1, 1);
  }

  // If the previous block was a function block, remove it from the list of
  // steps so the step numbering is consistent
  if (wasFunc) {
    Steps.splice(NextStep - 2, 1);
  }

  // For non-variable blocks
  if (!isVar) {

    if (!wasFunc) {
      // Advance the step counter
      NextStep++;
    }

    // If the next step is a go or save button, show that button.
    if (Steps[NextStep - 1] == "go-button" ||
        Steps[NextStep - 1] == "save-button") {
      document.getElementById(Steps[NextStep - 1]).style.display =
        "inline-block";
    }

    // Otherwise, if the previous block was not a function block, and either
    // the current block is not a function block or the next block is not a 
    // go button or save button, create a new numbered step in the algorithm box
    else if (!wasFunc && (!isFunc || (Steps[NextStep] != "go-button" &&
        Steps[NextStep] != "save-button"))) {
      var newAlgoStep = document.createElement("div");
      newAlgoStep.id = "algo-step-" + NextStep;
      newAlgoStep.innerHTML = NextStep + ".";
      document.getElementById("algo-steps").appendChild(newAlgoStep);
    }
  }

  // Point the hand at the next step
  document.getElementById(Steps[NextStep - 1]).appendChild(hand);
}

function init() {
  var images = document.getElementsByTagName("img");
  for (var i = 0; i < images.length; i++) {
    images[i].draggable = false;
  }

  var blocks = document.getElementsByClassName("block");
  for (var i = 0; i < blocks.length; i++) {
    blocks[i].addEventListener("click", handleClickOnBlock);
  }
}

function remove(id) {
  var element = document.getElementById(id);
  element.parentNode.removeChild(element);
  return element;
}

function rollDie(result, isSuccessful, callback) {
  var die = document.createElement("div");
  die.id = "die";
  document.getElementById("dice-result").appendChild(die);
  advanceDie(2, result, isSuccessful, callback);
}
