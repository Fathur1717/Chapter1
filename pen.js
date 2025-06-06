
var sketchProc = function (processingInstance) {
    with (processingInstance) {
      size(600, 600);
      frameRate(60);
      smooth();
  
      textAlign(CENTER, CENTER);
      textSize(25);
      strokeCap(PROJECT);
  
      //used for controlling the animation
      var lenBranches = 0,lenLeaves = 0,lenFlowers = 0;
  
      //define the tree object/properties
      var tree = {
        x: 300,
        y: 500,
        len: 100,
        depth: 6,
        angle: -90,
        branches: [],
        leaves: [],
        flowers: [],
        colors: {
          from: color(59, 39, 8),
          to: color(145, 108, 49) } };
  
  
  
      //the recursive function (will be called from within itself)
      var addBranch = function (x, y, depth, angle, len) {
  
        //if the depth is zero then end the recursion
        if (depth === 0) {
          return;
        }
  
        //calculate the end points of the branch
        var x2 = x + cos(angle * Math.PI / 180) * len;
        var y2 = y + sin(angle * Math.PI / 180) * len;
  
        //add the new branch to the tree
        tree.branches.push({
          x1: x,
          y1: y,
          x2: x2,
          y2: y2,
          depth: depth,
          color: lerpColor(tree.colors.from, tree.colors.to, map(depth, tree.depth, 1, 0, 1)) });
  
  
        //add some random leaves to the branches
        if (depth > 0 && depth < tree.depth - 3 && random() < 0.3) {
          for (var i = 0; i < 2; i++) {if (window.CP.shouldStopExecution(0)) break;
            var l = len * random(0.1, 0.9);
            var tx = x + cos(angle * Math.PI / 180) * l;
            var ty = y + sin(angle * Math.PI / 180) * l;
  
            tree.leaves.push({
              x: tx,
              y: ty,
              diameter: random(5, 10),
              color: color(random(80, 100), random(150, 180), random(90, 110)),
              angle: random(angle - 60, angle + 60) });
  
          }window.CP.exitedLoop(0);
        }
  
        //add some random flowers to the end of the branches
        if (depth === 1 && random() < 0.5 || depth === 2 && random() < 0.3) {
          tree.flowers.push({
            x: x2,
            y: y2,
            diameter: depth === 1 ? random(15, 25) : random(10, 15),
            color: color(random(200, 255), random(60, 100), random(90, 120)),
            angle: angle,
            gap: random(0, 90) });
  
        }
  
        //reduce the depth (extremely important to end your recursion)
        depth--;
  
        var l = len * random(0.6, 0.8);
        var x3 = x + cos(angle * Math.PI / 180) * l;
        var y3 = y + sin(angle * Math.PI / 180) * l;
  
        //call this function recursively
        addBranch(x2, y2, depth, angle - random(10, 50), len * random(0.75, 0.85));
        addBranch(x2, y2, depth, angle + random(10, 50), len * random(0.75, 0.85));
        addBranch(x3, y3, depth, angle + random(-30, 30), len * random(0.75, 0.85));
      };
  
      //call the recusive function
      addBranch(tree.x, tree.y, tree.depth, tree.angle, tree.len);
  
      draw = function () {
        background(230, 226, 202);
  
        noStroke();
        fill(50, 30);
        ellipse(tree.x, tree.y + 5, 200, 35);
  
        //draw the trees
        for (var i = 0; i < lenBranches; i++) {if (window.CP.shouldStopExecution(1)) break;
          var branch = tree.branches[i];
  
          //set the stroke opacity based on the branch depth
          stroke(branch.color, 50 + branch.depth * 35);
  
          //set the stroke thickness based on the branch depth
          strokeWeight(1 + branch.depth);
  
          //draw the branch
          line(branch.x1, branch.y1, branch.x2, branch.y2);
        }
  
        //used for animating the branches
        window.CP.exitedLoop(1);lenBranches = constrain(lenBranches + 1, 0, tree.branches.length);
  
        //if all the branches are displayed then show the leaves
        if (lenBranches === tree.branches.length) {
  
          //draw the leaves
          for (var i = 0; i < lenLeaves; i++) {if (window.CP.shouldStopExecution(2)) break;
            var leaf = tree.leaves[i];
  
            pushStyle();
            noStroke();
            fill(leaf.color);
            arc(leaf.x, leaf.y, leaf.diameter, leaf.diameter, (leaf.angle + 70) * Math.PI / 180, (leaf.angle + 290) * Math.PI / 180);
            popStyle();
          }
  
          //used for animating the leaves
          window.CP.exitedLoop(2);lenLeaves = constrain(lenLeaves + 1, 0, tree.leaves.length);
        }
  
        //if all the leaves are displayed then show the flowers
        if (lenLeaves === tree.leaves.length) {
  
          //draw the flowers
          for (var i = 0; i < lenFlowers; i++) {if (window.CP.shouldStopExecution(3)) break;
            var flower = tree.flowers[i];
  
            pushStyle();
            noStroke();
            fill(flower.color);
            arc(flower.x, flower.y, flower.diameter, flower.diameter, (flower.angle + flower.gap) * Math.PI / 180, (flower.angle + 360 - flower.gap) * Math.PI / 180);
            popStyle();
          }window.CP.exitedLoop(3);
  
          if (++lenFlowers === tree.flowers.length + 1) {
            noLoop();
          }
        }
  
        //display how many branches there are
        fill(50, 50);
      };
  
      mouseClicked = function () {
        tree.branches.length = 0;
        tree.leaves.length = 0;
        tree.flowers.length = 0;
  
        lenBranches = 0;
        lenLeaves = 0;
        lenFlowers = 0;
  
        tree.angle = random(-100, -80);
  
        addBranch(tree.x, tree.y, tree.depth, tree.angle, tree.len);
  
        loop();
      };
  
  
    }
  };
  
  var canvas = document.getElementById("canvas");
  var processingInstance = new Processing(canvas, sketchProc);
  //# sourceURL=pen.js
      