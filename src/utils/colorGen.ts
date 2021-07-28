import { grabRandomUniqueIndex } from './orderLogic';
const backgroundColors = ['BCE784', '5DD39E', '348AA7', '525174', '513B56'];

export function backgroundColorGen() {
  let randomIndex = grabRandomUniqueIndex(backgroundColors);
  const randomColor = backgroundColors[randomIndex];
  return randomColor;
}

export function circleColorGen() {}
