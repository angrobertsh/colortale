import myDictionary from './myDictionary.js';

function findEmotion()
{
  let text = document.getElementById("currentnote").value
  let processArray = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"']/g,"").replace(/\s{2,}/g," ").split(" ");
  let wordEmotions = [];
  let sumEmotions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let idxOfMax = 0;
  let sortedEmotions = [];

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

  // ideal: anger joy disgust fear sadness surprise trust anticipation positive negative
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

  switch(idxOfMax){
    case 0:
      // "#ff0000";
      color = [255, 0, 0];
      break;
    case 1:
      // "#33ff33";
      color = [51, 255, 51];
      break;
    case 2:
      // "#802b00";
      color = [128, 43, 0];
      break;
    case 3:
      // "#000000";
      color = [0, 0, 0];
      break;
    case 4:
      // "#ffff00";
      color = [255, 255, 0];
      break;
    case 5:
      // "#808080";
      color = [128, 128, 128];
      break;
    case 6:
      // "#9900ff";
      color = [153, 0, 255];
      break;
    case 7:
      // "#3333ff";
      color = [51, 51, 255];
      break;
    case 8:
      // "#ff9933";
      color = [255, 153, 51];
      break;
    case 9:
      // "#ffb3d1";
      color = [255, 179, 209];
      break;
  }

  if(sortedEmotions[idxOfMax] === 0){
    color = [179, 179, 179];
  }

  return [color, entropy];

}

export default findEmotion;
