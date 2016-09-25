import findEmotion from './dictionary/findEmotion.js';
import PathGenerator from './path_generator.js';
import preloaded from './preloaded.js';

function processNote(){
  let note = document.getElementById("currentnote").value;
  let emotion = findEmotion();
  let transitionColor = emotion[0];
  let entropy = emotion[1];
  let sizevar = Math.floor(note.length/6*entropy)+80
  if(sizevar > 800){
    sizevar = 800;
  }

  // paints the line from previous loc to loc
  processLine(transitionColor, entropy, sizevar);
  // flowers based on sizevar

  // moves the div to location loc and transition shrinks it (assigns a new class) and gives it a clickablness
  createMoveDiv(note);

  // clears the textbox
  window.story.push(note);
  document.getElementById("currentnote").value = "";
  document.getElementById("allnotes").value += (`Part ${window.points.length}:\r\r${note}\r\r`);

}

function processLine(transitionColor, entropy, sizevar){
  makeLine(transitionColor, entropy, sizevar);
  makeFlower(transitionColor, entropy, sizevar);
}

function makeLine(transitionColor, entropy, sizevar){
  let x1 = 0;
  let y1 = 0;
  let x2 = 0;
  let y2 = 0;
  let linearray = [];

  if(window.points.length === 0){
    x1 = Math.random()*1000;
    y1 = Math.random()*600;
    x2 = x1;
    y2 = y1;
  } else {
    let lastpoint = window.points[window.points.length-1];
    x1 = lastpoint[0];
    y1 = lastpoint[1];
    x2 = Math.random()*1000;
    y2 = Math.random()*600;
    let distance = Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
    let xincrement = (x2-x1)/(distance);
    let yincrement = (y2-y1)/(distance);
    let plusminus = 0;

    for(let j = 0; j < distance; j++){
      plusminus = ((Math.floor(Math.random()*2))*2)-1;
      linearray.push([Math.floor(x1+(xincrement*j)), (Math.floor(y1+(yincrement*j)+(Math.random()*entropy))*plusminus)]);
    }

    window.pathGenerator.color = transitionColor;
    window.pathGenerator.size = sizevar;
    window.pathGenerator.entropy = entropy;

    window.pathGenerator.drawLine(linearray);
  }
  window.points.push([x2,y2]);
}

function makeFlower(transitionColor, entropy, sizevar){
  let offSetX = window.points[window.points.length-1][0];
  let offSetY = window.points[window.points.length-1][1];
  let adjustPreloaded = [];

  for(let i = 0; i < sizevar-60; i++){
    adjustPreloaded.push([(preloaded[i][0]-preloaded[0][0]+offSetX), (preloaded[i][1]-preloaded[0][1]+offSetY)]);
  }

  window.pathGenerator.color = transitionColor;
  window.pathGenerator.size = sizevar;
  window.pathGenerator.entropy = entropy;

  window.pathGenerator.drawLine(adjustPreloaded);
}

function createMoveDiv(note){
  let div = document.createElement('div');
  div.style.left = window.points[window.points.length-1][0]+"px";
  div.style.top = window.points[window.points.length-1][1]+"px";
  div.innerHTML = `<div class="partname">Part ${window.points.length}</div><div class="message">${note}</div>`;
  div.className = 'note';
  function biggen(){
    this.childNodes[0].classList.toggle('biggen');
  }
  function showFull(){
    for(let i = 0; i < this.childNodes.length; i++)
    {
      this.childNodes[i].classList.toggle('showAll');
    }
  }

  div.addEventListener('mouseenter', biggen )
  div.addEventListener('mouseleave', biggen )
  div.addEventListener('click', showFull )
  document.getElementById('notes').appendChild(div);
}


export default processNote;
