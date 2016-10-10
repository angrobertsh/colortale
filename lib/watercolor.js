import PathGenerator from './path_generator.js';
import processNote from './processNote.js';


document.addEventListener('DOMContentLoaded', () => {
  window.pathGenerator = new PathGenerator();
  window.processNote = processNote;
  window.points = [];
  window.story = [];
  let canvas = document.getElementById('canvas');
  let splash = document.getElementById('splash');
  splash.addEventListener('click', () => {splash.setAttribute('style', 'display: none');});
  canvas.setAttribute('style', 'background-color: rgba(255, 255, 255, .3);');
});






// canvas.setAttribute('style', 'background-image: url(https://res.cloudinary.com/wkdal720/image/upload/v1473858517/watercolor/1_dkzdfo.jpg)');
