import myDictionary from './myDictionary.js';

function findEmotion()
{
  let text = document.getElementById("currentnote").value
  let punctuationless = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"']/g,"");
  let finalString = punctuationless.replace(/\s{2,}/g," ");

  let processArray = finalString.split(" ");
  let wordEmotions = [];
  let sumEmotions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let idxOfMax = 0;
  let sortedEmotions = [];

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

  for(let i = 0; i < sumEmotions.length; i++){
    if(sortedEmotions[i] > sortedEmotions[idxOfMax]){
      idxOfMax = i;
    }
  }

  // Sorted to 0: anger 1: joy 2: disgust 3: fear 4: sadness 5: surprise 6: trust 7: anticipation 8: positive 9: negative

  switch(idxOfMax){
    case 0:
      return "#ff0000";
    case 1:
      return "#33ff33";
    case 2:
      return "#802b00";
    case 3:
      return "#000000";
    case 4:
      return "#ffff00";
    case 5:
      return "#808080";
    case 6:
      return "#9900ff";
    case 7:
      return "#3333ff";
    case 8:
      return "#ff9933";
    case 9:
      return "#ffb3d1";
  }
}

export default findEmotion;
