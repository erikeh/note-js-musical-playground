const colors = ['BCE784', '5DD39E', '348AA7', '525174', '513B56'];
let uniqueIndices: number[] = [];
let uniqueIndexMemo: number;

// helper functions
const generateUniqueIndices = () => [...Array(colors.length).keys()];

const createRandomIndexWithinRange = () => {
  return Math.floor(Math.random() * uniqueIndices.length);
};

const grabRandomUniqueIndex = () => {
  let idx: number;
  if (!uniqueIndices.length) {
    uniqueIndices = generateUniqueIndices();
  }
  do {
    idx = createRandomIndexWithinRange();
    console.log('creating random index');
  } while (idx === uniqueIndexMemo);
  uniqueIndexMemo = idx;
  return uniqueIndices.splice(idx, 1)[0];
};

export function bgColorGen() {
  let randomIndex = grabRandomUniqueIndex();
  const randomColor = colors[randomIndex];
  return randomColor;
}

export function circleColorGen() {}
