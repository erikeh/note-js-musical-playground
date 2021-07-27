const colors = ['BCE784', '5DD39E', '348AA7', '525174', '513B56'];

const generateUniqueIndices = () => [...Array(colors.length).keys()];
let uniqueIndices = [];

const grabRandomUniqueIndex = () => {
  if (!uniqueIndices.length) {
    uniqueIndices = generateUniqueIndices();
  }
  let idx = Math.floor(Math.random() * uniqueIndices.length);
  return uniqueIndices.splice(idx, 1)[0];
};

export function bgColorGen() {
  let randomIndex = grabRandomUniqueIndex();
  const randomColor = colors[randomIndex];
  // console.log('color:', randomColor)
  return randomColor;
}

export function circleColorGen() {}
