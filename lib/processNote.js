import findEmotion from './dictionary/findEmotion.js';
import PathGenerator from './path_generator.js';


function processNote(){
  let note = document.getElementById("currentnote").value;
  let emotion = findEmotion();
  let transitionColor = emotion[0];
  let entropy = emotion[1];
  let sizevar = note.length + 150
  if(sizevar > 1000){
    sizevar = 1000;
  }


  // paints the line from previous loc to loc
  processLine(emotion, transitionColor, entropy, sizevar);
  // maybe flowers based on text length too -- should be done in processLine

  // moves the div to location loc and transition shrinks it (assigns a new class) and gives it a clickablness
  createMoveDiv(note);

  // clears the textbox
  document.getElementById("currentnote").value = "";
  document.getElementById("allnotes").value += (" " + note);

}

function processLine(emotion, transitionColor, entropy, sizevar){
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
    // debugger
    let distance = Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
    let xincrement = (x2-x1)/(distance);
    let yincrement = (y2-y1)/(distance);

    for(let j = 0; j < distance; j++){
      linearray.push([Math.floor(x1+(xincrement*j)+(Math.random()*entropy)), Math.floor(y1+(yincrement*j)+(Math.random()*entropy))]);
    }

    window.pathGenerator.lineArray = linearray;
    window.pathGenerator.color = transitionColor;
    window.pathGenerator.size = sizevar;

    pathGenerator.drawLine();
  }
  window.points.push([x2,y2]);
}

function createMoveDiv(note){
  let div = document.createElement('div');
  div.style.left = window.points[window.points.length-1][0]+"px";
  div.style.top = window.points[window.points.length-1][1]+"px";
  div.innerHTML = `<div class="message">${note}</div>`;
  div.className = 'minified';
  document.getElementById('notes').appendChild(div);
}


export default processNote;
