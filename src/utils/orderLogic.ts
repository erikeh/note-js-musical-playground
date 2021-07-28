import Matter from 'matter-js';
import { SoundColorOptions } from './soundColorOptions';

// logic for selecting appropriate sound/color option
export function selectRandomOption(options: SoundColorOptions) {
  const optionKeys = Object.keys(options);
  const randomIndex = Math.floor(
    Matter.Common.random(1, Number(optionKeys[optionKeys.length - 1]) + 1)
  );
  const randomSoundColorOption = options[randomIndex];
  return randomSoundColorOption;
}

let keyMemo: number;
export function selectNextOption(options: SoundColorOptions) {
  const optionKeys = Object.keys(options);
  function nextIndex() {
    if (!keyMemo || keyMemo + 1 > optionKeys.length) {
      keyMemo = Number(optionKeys[0]);
      return options[keyMemo];
    } else {
      keyMemo++;
      return options[keyMemo];
    }
  }
  const nextSoundColorOption = nextIndex();
  return nextSoundColorOption;
}

// logic for generating random index within given array of color codes
let uniqueIndices: number[] = [];
export function grabRandomUniqueIndex(colorOptions: string[]) {
  let idx: number;
  const generateUniqueIndices = (colors: string[]) => [...Array(colors.length).keys()];
  const createRandomIndexWithinRange = () => {
    return Math.floor(Math.random() * (uniqueIndices.length - 2));
  };
  if (!uniqueIndices.length) {
    uniqueIndices = generateUniqueIndices(colorOptions);
  }
  idx = createRandomIndexWithinRange();
  const uniqueRandomIndex = uniqueIndices.splice(idx, 1)[0];
  uniqueIndices.push(uniqueRandomIndex);
  return uniqueRandomIndex;
}

// function randomAngle() {
//   let angle = Math.random() * Math.PI * 2;
//   console.log(angle);
//   return angle;
// }
