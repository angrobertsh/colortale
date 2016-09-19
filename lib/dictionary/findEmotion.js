import myDictionary from './myDictionary.js';


function findEmotion(text = "")
{
  let punctuationless = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"']/g,"");
  let finalString = punctuationless.replace(/\s{2,}/g," ");

  let processArray = finalString.split(" ");
  let wordEmotions = [];
  let sumEmotions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let idxOfMax = 0;

  processArray.forEach((word) => {
    if(myDictionary[word]){
      wordEmotions = myDictionary[word];

      wordEmotions.forEach((emo, idx, arr) =>{
        sumEmotions[idx] += arr[idx];
      })
    }
  });

  for(let i = 0; i < sumEmotions.length; i++){
    if(sumEmotions[i] > sumEmotions[idxOfMax]){
      idxOfMax = i;
    }
  }

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


  // ideal: anger joy disgust fear sadness surprise trust anticipation positive negative
  // current: anger anticipation disgust fear joy negative positive sadness surprise trust

}

export default findEmotion;
