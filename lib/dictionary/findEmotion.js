import myDictionary from './myDictionary.js';

function findEmotion()
{
  let text = document.getElementById("currentnote").value
  let processArray = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"']/g,"").replace(/\s{2,}/g," ").split(" ");
  let wordEmotions = [];
  let sumEmotions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let idxOfMax = 0;
  let sortedEmotions = [];
  let night = window.pathGenerator.night;


  let color = [0, 0, 0];
  let entropy = 0;

  processArray.forEach((word) => {
    if(myDictionary[word]){
      wordEmotions = myDictionary[word];
      wordEmotions.forEach((emo, idx, arr) =>{
        sumEmotions[idx] += arr[idx];
      })
    }
  });

  // current: anger anticipation disgust fear joy negative positive sadness surprise trust

  sortedEmotions[0] = sumEmotions[0];
  sortedEmotions[1] = sumEmotions[4];
  sortedEmotions[2] = sumEmotions[2];
  sortedEmotions[3] = sumEmotions[3];
  sortedEmotions[4] = sumEmotions[7];
  sortedEmotions[5] = sumEmotions[8];
  sortedEmotions[6] = sumEmotions[9];
  sortedEmotions[7] = sumEmotions[1];
  sortedEmotions[8] = sumEmotions[6];
  sortedEmotions[9] = sumEmotions[5];

  for(let i = 0; i < sortedEmotions.length; i++){
    if(sortedEmotions[i] > sortedEmotions[idxOfMax]){
      idxOfMax = i;
    }
  }

  entropy = (sortedEmotions.reduce((a, b) => (a + b), 0)/processArray.length)*50;

  // Sorted to 0: anger 1: joy 2: disgust 3: fear 4: sadness 5: surprise 6: trust 7: anticipation 8: positive 9: negative

  if(night){
    switch(idxOfMax){
      case 0:
        color = [255, 0, 0];
        break;
      case 1:
        color = [255, 255, 0];
        break;
      case 2:
        color = [128, 43, 0];
        break;
      case 3:
        color = [25, 25, 25];
        break;
      case 4:
        color = [0, 255, 255];
        break;
      case 5:
        color = [255, 153, 51];
        break;
      case 6:
        color = [153, 0, 255];
        break;
      case 7:
        color = [51, 255, 51];
        break;
      case 8:
        color = [255, 179, 209];
        break;
      case 9:
        color = [100, 100, 100];
        break;
    }
  } else {
    switch(idxOfMax){
      case 0:
        color = [255, 0, 0];
        break;
      case 1:
        color = [255, 255, 0];
        break;
      case 2:
        color = [128, 43, 0];
        break;
      case 3:
        color = [0, 0, 0];
        break;
      case 4:
        color = [0, 255, 255];
        break;
      case 5:
        color = [255, 153, 51];
        break;
      case 6:
        color = [153, 0, 255];
        break;
      case 7:
        color = [51, 255, 51];
        break;
      case 8:
        color = [255, 179, 209];
        break;
      case 9:
        color = [100, 100, 100];
        break;
    }
  }


  if(sortedEmotions[idxOfMax] === 0){
    color = [179, 179, 179];
  }

  return [color, entropy];

}

export default findEmotion;
