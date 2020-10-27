// Forest fire simulation
// Author: Aaron Weeden, Shodor, 2016–2019

// Declare global constants
var TREE_COUNT_X = 16; // # of trees in x direction
var TREE_COUNT_Y = 16; // # of trees in y direction
var INTERVAL_MILLIS = 100; // Length of time step interval (milliseconds)
var BURN_CHANCE = 60; // Burn chance (0-100)
var TREE_WIDTH = 20; // Pixel width of each tree
var TREE_HEIGHT = 20; // Pixel height of each tree

// Declare global variables
var Trees; // 2D array of tree DOM div objects
var InitBurnX; // x position of initially-burning tree
var InitBurnY; // y position of initially-burning tree
var IntervalID; // Time interval ID
var IsRunning = false; // If the model has started running

// Define the function that runs when the page loads
onload = function () {

  // Create the tree DOM div objects 
  CreateTrees();

  // Initialize the simulation
  Reset();

}; // end function onload()


/* Define a function to advance the model by swapping in each tree's next state
   for the current state */
function Advance() {

  // Loop over all tree columns, excluding the borders
  for (var x = 1; x < TREE_COUNT_X - 1; x++) {

    // Loop over all tree rows, excluding the borders
    for (var y = 1; y < TREE_COUNT_Y - 1; y++) {

      // Create a variable to store the current tree
      var tree = document.getElementById(x + "-" + y);

      // Swap in the tree's next state for its current state
      tree.style.backgroundImage = tree.getAttribute("data-nextBackground");

    } // end for (var y)

  } // end for (var x)

} // end function Advance()


// Define a function that returns whether the burn chance happens
function BurnChanceHappens() {

  return RandIntInRange(0, 100) < BURN_CHANCE;

} // end function BurnChanceHappens()


// Define a function to create the tree DOM div objects
function CreateTrees() {

  var treeArea = document.getElementById("tree-area");

  // Loop over all tree rows, excluding the borders
  for (var y = 0; y < TREE_COUNT_Y; y++) {

    // Create a DOM div object for the row
    var row = document.createElement("div");
    treeArea.appendChild(row);

    // Loop over all tree columns, excluding the borders
    for (var x = 0; x < TREE_COUNT_X; x++) {

      // Create a DOM div object for the tree, positioned at the correct (x,y)
      // coordinate, with a click handler
      var tree = document.createElement("div");
      tree.id = x + "-" + y;
      tree.className = "tree";
      tree.setAttribute("data-x", x);
      tree.setAttribute("data-y", y);
      tree.style.left = (x * TREE_WIDTH) + "px";
      tree.style.top = (y * TREE_HEIGHT) + "px";
      if (x === 0 || x === TREE_COUNT_X - 1 ||
          y === 0 || y === TREE_COUNT_Y - 1) {
        tree.style.display = "none";
      }
      tree.addEventListener("click", function (evt) {
        if (!IsRunning) {
          InitBurnX = +evt.target.getAttribute("data-x");
          InitBurnY = +evt.target.getAttribute("data-y");
          document.getElementById(InitBurnX + "-" +
            InitBurnY).style.backgroundImage = "url(\"https://raw.githack.com/hourofci/lessons-dev/master/beginner-lessons/computational-thinking/supplementary/burning.png\")";
          IsRunning = true;
          IntervalID = setInterval(Step, INTERVAL_MILLIS);
          // logging
          run_logging();
        }
      });
      row.appendChild(tree);

    } // end for (var y)

  } // end for (var x)

} // end function CreateTrees()


/* Define a function that returns whether a tree is in the bottom border row
   of the forest */
function IsInBottomBorderRow(tree) {

  return +tree.getAttribute("data-y") === TREE_COUNT_Y - 1;

} // end function IsInBottomBorderRow(tree)


/* Define a function that returns whether a tree is in the left border column
   of the forest */
function IsInLeftBorderColumn(tree) {

  return +tree.getAttribute("data-x") === 0;

} // end function IsInLeftBorderColumn(tree)


/* Define a function that returns whether a tree is in the right border column
   of the forest */
function IsInRightBorderColumn(tree) {

  return +tree.getAttribute("data-x") === TREE_COUNT_X - 1;

} // end function IsInRightBorderColumn(tree)


// Define a function that returns whether a tree is in the top border row of
// the forest
function IsInTopBorderRow(tree) {

  return +tree.getAttribute("data-y") === 0;

} // end function IsInTopBorderRow(tree)


// Define a function that returns whether a tree is on the border of the forest
function IsOnBorder(tree) {

  return IsInLeftBorderColumn(tree) ||
         IsInTopBorderRow(tree) ||
         IsInRightBorderColumn(tree) ||
         IsInBottomBorderRow(tree);

} // end function IsOnBorder(tree)


// Define a function that returns whether a given tree has a neighbor on fire
function NeighborIsOnFire(tree) {

  return TopNeighborIsOnFire(tree) ||
         LeftNeighborIsOnFire(tree) ||
         RightNeighborIsOnFire(tree) ||
         BottomNeighborIsOnFire(tree);

} // end function NeighborIsOnFire(tree)


/* Define a function that returns a random integer between min (inclusive)
   and max (inclusive) */
function RandIntInRange(min, max) {

  return min + Math.floor(Math.random() * (max - min));

} // end function GetRandInt(min, max)


// Define a function that resets the simulation
function Reset() {

  // Stop the repeating interval
  clearInterval(IntervalID);
  IsRunning = false;

  // Define tree positions and states
  ResetTrees();

} // end function Reset()


// Define a function to define tree positions and states
function ResetTrees() {

  // Loop over the trees in the x direction
  for (var x = 0; x < TREE_COUNT_X; x++) {

    // Loop over the trees in the y direction
    for (var y = 0; y < TREE_COUNT_Y; y++) {

      // Set the state of the tree
      SetTreeState(document.getElementById(x + "-" + y));

    } // end for (var y)

  } // end for (var x)

} // end function ResetTrees()


// Define a function to set the states of trees in the next time step
function SetNextStates() {

  // Loop over all tree columns, excluding the borders
  for (var x = 1; x < TREE_COUNT_X - 1; x++) {

    // Loop over all tree rows, excluding the borders
    for (var y = 1; y < TREE_COUNT_Y - 1; y++) {

      // Create a variable to store the current tree
      var tree = document.getElementById(x + "-" + y);

      // If the tree is currently burning
      if (tree.style.backgroundImage === "url(\"https://raw.githack.com/hourofci/lessons-dev/master/beginner-lessons/computational-thinking/supplementary/burning.png\")") {

        // Set it to be burnt in the next time step
        tree.setAttribute("data-nextBackground", "url(\"https://raw.githack.com/hourofci/lessons-dev/master/beginner-lessons/computational-thinking/supplementary/burnt.png\")");

      } // end if

      // Otherwise, if the tree is not currently burning
      else {

        // Keep the tree in its current state for the next time step
        tree.setAttribute("data-nextBackground", tree.style.backgroundImage);

      } // end else

      // If the tree will be non-burning in the next time step
      if (tree.getAttribute("data-nextBackground") === "url(\"https://raw.githack.com/hourofci/lessons-dev/master/beginner-lessons/computational-thinking/supplementary/healthy.png\")") {

        // Try to spread the fire to the tree from each of its 4 neighbors
        TrySpread(tree);

      } // end if

    } // end for (var y)

  } // end for (var x)

} // end function SetNextStates()


// Define a function to set the state of a tree
function SetTreeState(tree) {

  // If the tree is on the border,
  if (IsOnBorder(tree)) {

    // Set the tree's state to burnt
    tree.style.backgroundImage = "url(\"https://raw.githack.com/hourofci/lessons-dev/master/beginner-lessons/computational-thinking/supplementary/burnt.png\")";

  } // end if

  // Otherwise, if the tree is not on the border
  else {

    // Indicate the current tree is non-burning
    tree.style.backgroundImage = "url(\"https://raw.githack.com/hourofci/lessons-dev/master/beginner-lessons/computational-thinking/supplementary/healthy.png\")";

  } // end else

  /* Make a copy of the tree's state, because when we advance the
     model, we don't want to update a tree's state until its neighbors have had
     a chance to check it. */
  tree.setAttribute("data-nextBackground", tree.style.backgroundImage);

} // end function SetTreeState(tree)


// Define a function to see if fire spreads from the tree at the given x,y
// position
function Spread(x, y) {

  return TreeIsOnFire(document.getElementById(x + "-" + y)) &&
         BurnChanceHappens();

} // end function SpreadFromBottom(tree)


/* Define a function that returns whether fire spreads from the bottom neighbor
   of the given tree */
function SpreadFromBottom(tree) {

  return Spread(+tree.getAttribute("data-x"),
    +tree.getAttribute("data-y") + 1);

} // end function SpreadFromBottom(tree)


/* Define a function that returns whether fire spreads from the left neighbor
   of the given tree */
function SpreadFromLeft(tree) {

  return Spread(+tree.getAttribute("data-x") - 1,
    +tree.getAttribute("data-y"));

} // end function SpreadFromLeft(tree)


/* Define a function that returns whether fire spreads from the right neighbor
   of the given tree */
function SpreadFromRight(tree) {

  return Spread(+tree.getAttribute("data-x") + 1,
    +tree.getAttribute("data-y"));

} // end function SpreadFromRight(tree)


/* Define a function that returns whether fire spreads from the top neighbor
   of the given tree */
function SpreadFromTop(tree) {

  return Spread(+tree.getAttribute("data-x"),
    +tree.getAttribute("data-y") - 1);

} // end function SpreadFromTop(tree)


// Define a function that is called to advance the model by one time step
function Step() {

  // Set the states of trees in the next time step
  SetNextStates();

  // Advance the model by swapping in each tree's next state for the current
  // state
  Advance();

} // end function Step()


// Define a function that returns whether a given tree is on fire
function TreeIsOnFire(tree) {

  return tree.style.backgroundImage === "url(\"https://raw.githack.com/hourofci/lessons-dev/master/beginner-lessons/computational-thinking/supplementary/burning.png\")";

} // end function TreeIsOnFire(tree)


// Define a function for trying to spread the fire to a tree from each of its
// 4 neighbors
function TrySpread(tree) {

  // If the tree's neighbor is on fire and the burn chance happens,
  if (SpreadFromTop(tree) ||
      SpreadFromLeft(tree) ||
      SpreadFromRight(tree) ||
      SpreadFromBottom(tree)) {

    // Light the tree on fire in the next time step
    tree.setAttribute("data-nextBackground", "url(\"https://raw.githack.com/hourofci/lessons-dev/master/beginner-lessons/computational-thinking/supplementary/burning.png\")");

  } // end if

} // end function TrySpread(tree)

