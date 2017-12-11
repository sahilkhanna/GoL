var x_size =0;
var y_size=0;
var framerate;
var boxnumber=100;

var grid
let columns= boxnumber
let rows = boxnumber
let age
let max_age = 100
function setup() {
  canvas = createCanvas(windowWidth*0.99, windowHeight*0.99);

  canvas.parent("p5canvas");
  x_size=10
  y_size=10
  boxnumber = floor(windowWidth*0.99 / 10)
  columns= boxnumber
  rows = boxnumber
  //frameRate(10);
  grid = make2dArray(columns,rows)
  age = make2dArray(columns,rows)

  for (var i = 0; i < columns; i++) {
    for (var j = 0; j < rows; j++) {
      c = color('rgba(255, 255, 255, 0.1)');
        fill(c);
      grid[i][j]=floor( map( noise(i, j + (j * 0.01) ),0,1,0,1.5))
      if (grid[i][j]) {
        age[i][j]=1
      }else {
        age[i][j]=0
      }
    }
  }
}

function draw() {
  background(color('#78c1ff'))
  stroke(255);

      for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
          c = color('rgba(230, 127, 179, 0.5)');
            fill(c);
          if (grid[i][j]) {
            rect(x_size*i, y_size*j, x_size, y_size);
          }
        }
      }

    let next = make2dArray(columns,rows);
    for (var i = 0; i < columns; i++) {
      for (var j = 0; j < rows; j++) {
          let state = grid[i][j]
          let sum =0
          let neighbors = countNeighbours(grid, i, j)
          if (state === 0 && neighbors === 3 ) {
            next[i][j]=1
            }else if (state === 1 && (neighbors<2 || neighbors>3)) {
            next[i][j] = 0
            }else {
            next[i][j] = state
          }
          if (next[i][j]) {
            age[i][j]+=1
          }else{
            age[i][j]=0
          }

          if (age[i][j]>max_age) {
            age[i][j] = 0
            next[i][j] = 0
            next[(Karma(i) + columns) % columns] [( Karma(j) + rows ) % rows] = 1
            //console.log("deadbeef ",i," ",j);
          }
        }
      }
      grid=next
}

let randomise
function go(){
//  redraw();
randomise=random();
for (var i = 0; i < columns; i++) {
  for (var j = 0; j < rows; j++) {
    c = color('rgba(255, 255, 255, 0.1)');
      fill(c);
    grid[i][j]=floor( map( noise(i, j + (j * 0.01) + randomise),0,1,0,1.5))
  }
}
}

function make2dArray(cols, rows) {
  let arr = new Array(cols)
  for (var i = 0; i < arr.length; i++) {
    arr[i]=new Array(rows)
  }
  return arr;
}

function countNeighbours(grid,x,y) {
  let sum = 0
  for (let i = -1; i <2; i++) {
    for (let j = -1; j <2; j++) {
      let col = (i + x + columns)% columns
      let row = (j + y + rows)% rows
      sum +=grid[col][row]
    }
  }
  sum-=grid[x][y]
  return sum
}

function setAge() {
  max_age=tiles=document.getElementById('maxage').value
}

function Karma(i){
  return (i + floor( map( random(), 0 , 1, -1.5 , 1.5 ) ) )
}
