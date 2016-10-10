import BreadthFirst from './breadth_first.js';

class PathGenerator {
  constructor(color = [192, 192, 192], size = 300, entropy = 0) {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.color = color;
    this.paths = [];
    this.cells = {};
    this.night = false;
    this.clear = this.clear.bind(this);
    this.size = size;
    this.entropy = entropy;

    // // matches color in color bar and updates on change
    // let colorInput = document.getElementById('color');
    // colorInput.addEventListener('change', (e) => {
    //   this.color = e.target.style.backgroundColor.match(/\d+/g).map((n) => parseInt(n));
    // });
    //
    // // gets brush size based on slider value
    // this.sizeInput = document.getElementById('size');
    // this.size = parseInt(this.sizeInput.value);
    // this.sizeInput.addEventListener('change', (e) => {
    //   this.size = parseInt(e.target.value);
    // });

    // changes background canvas
    document.getElementById('default').addEventListener('click', this.changeBackGround.bind(this));
    document.getElementById('night').addEventListener('click', this.changeBackGround.bind(this));

    // clear button
    let clearButton = document.getElementById('clear');
    clearButton.addEventListener('click', this.clear);

    this.canvas.addEventListener('click', this.clickHandler.bind(this));
    this.canvas.addEventListener('mousemove', this.dragHandler.bind(this));
    // this.canvas.addEventListener('mouseup', this.mouseUpHandler.bind(this));
  }

  indexHelper(x, y) {
    return parseInt(x) + parseInt(y) * this.width;
  }

  drawLine(lineArray){
    let i = 0

    let moveOver = () => {
      let move = new MouseEvent('mousemove', {
        button: 0, buttons: 1,
        clientX: this.canvas.getBoundingClientRect().left+lineArray[i][0], clientY: this.canvas.getBoundingClientRect().top+lineArray[i][1]});
      this.canvas.dispatchEvent(move);
      i += 1;
      if (i > lineArray.length - 1) {
        window.clearInterval(interval);
      }
    };

    let interval = window.setInterval(moveOver, this.entropy*Math.random()/3);
  }

  clickHandler(e) {
    let sIdx = this.indexHelper(e.offsetX, e.offsetY);
    let breadthFirst = new BreadthFirst({
      color: this.color,
      width: this.width,
      height: this.height,
      startIdx: sIdx,
      size: this.size,
      cells: this.cells,
      night: this.night,
      ctx: this.ctx});
      this.paths.push(breadthFirst);
  }

  dragHandler(e) {
    if (e.button === 0 && e.buttons === 1) {
        let sIdx = this.indexHelper(e.offsetX, e.offsetY);
        let breadthFirst = new BreadthFirst({
          color: this.color,
          width: this.width,
          height: this.height,
          startIdx: sIdx,
          size: this.size,
          cells: this.cells,
          night: this.night,
          ctx: this.ctx});
          this.paths.push(breadthFirst);
      }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.paths.forEach((p) => p.clearInterval());
    this.cells = {};
    this.paths = [];
    this.lineSegments = [];
    // clear the inner html of the canvas's divs
    document.getElementById('notes').innerHTML = "";
    document.getElementById('allnotes').value = "";
    window.story = [];
    window.points = [];
  }

  // shifting from day and night mode and swapping backgrounds
  changeBackGround(e) {
    if (this.night && e.target.id !== "night" && window.confirm("Entering Seraph. All work will be lost.")) {
      this.night = false;
      document.getElementById("default").style.textDecoration = "underline";
      document.getElementById("night").style.textDecoration = "none";
      this.clear();
    }
    if (e.target.id === "default") {
      document.getElementById("body").setAttribute('style', 'background-image: url("http://res.cloudinary.com/dujcpxlhk/image/upload/v1476134129/ppetbqlvzr3ussgu9d1v.jpg")');
      this.canvas.setAttribute('style', 'background-image: none; background-color: rgba(255, 255, 255, .3);');
    } else if (e.target.id === "night") {
      if (!this.night && window.confirm("Entering Dread. All work will be lost.")) {
        this.night = true;
        document.getElementById("body").setAttribute('style', 'background-image: url("http://res.cloudinary.com/dujcpxlhk/image/upload/v1476135730/delrzy9dpj1k3rkqxjyp.jpg")');
        this.canvas.setAttribute('style', 'background-image: none; background-color: rgba(0, 0, 0, .7);');
        document.getElementById("default").style.textDecoration = "none";
        document.getElementById("night").style.textDecoration = "underline";
        this.clear();
      }
    }else {
      this.canvas.setAttribute('style', `background-image: url(${e.target.src})`);
    }
  }
}

export default PathGenerator;
