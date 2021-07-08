import Matter from 'matter-js';
import MatterAttractors from 'matter-attractors';
import {
  soundColorOptions,
  soundColorOptionsChord,
  soundColorOptionsDrone,
  soundColorOptionsPluck,
} from '../utils/soundColorOptions';

Matter.use(MatterAttractors);

interface usefulBody extends Matter.Body {
  sound?: string;
  nextChord?: Function;
}

// helper functions
function selectRandomOption(option) {
  const optionKeys = Object.keys(option)
  const randomIndex = Math.floor(Matter.Common.random(1, Number(optionKeys[optionKeys.length - 1]) + 1))
  return option[randomIndex]
}

let keyMemo: number;
function selectNextOption(option) {
  const optionKeys = Object.keys(option);
  function nextIndex() {
    if (!keyMemo || keyMemo + 1 > optionKeys.length) {
      keyMemo = Number(optionKeys[0]);
      return option[keyMemo];
    } else if ((keyMemo + 1) <= optionKeys.length) {
        keyMemo++;
        return option[keyMemo];
    } else {
      console.log('error, selectNextOption function isnt working')
      return;
    }
  }
  const nextChordOption = nextIndex();
  return nextChordOption;
}

// create bodies
export function createSquare(
  x = Math.random() * 400,
  y = Math.random() * 400 - 200,
  width = Math.random() * 80 + 10,
  height = Math.random() * 80 + 10
) {
  return Matter.Bodies.rectangle(x, y, width, height);
}

export function createChordSquare(
  x = Math.random() * 400,
  y = Math.random() * 200,
  width = 40,
  height = 60
  ) {
  const option = selectNextOption(soundColorOptionsChord)
  const square: usefulBody = Matter.Bodies.rectangle(x, y, width, height, {
    restitution: 2.2,
    render : {
      fillStyle: option.color,
    }
  });
  square.sound = option.sound
  square.nextChord = function() {
    const nextOption = selectNextOption(soundColorOptionsChord)
    return nextOption;
  }
  return square;
}

export function createCircle(
  x = Math.random() * 800 - 400,
  y = Math.random() * 200 + 200,
  radius = Math.random() * 30 + 10
) {
  const option = selectRandomOption(soundColorOptionsPluck);
  const circle: usefulBody = Matter.Bodies.circle(x, y, radius, {
    restitution: 1.5,
    collisionFilter: {
      group: -1
    },
    render : {
      fillStyle: option.color,
    }
  });
  circle.sound = option.sound;
  return circle;
}

export function createDroneCircle(
  x = Math.random() * 200 + 200,
  y = Math.random() * 200,
  radius = Math.random() * 20 + 40
) {
  const option = selectRandomOption(soundColorOptionsDrone);
  const circle: usefulBody = Matter.Bodies.polygon(x, y, 6, Matter.Common.random(25, 40), {
    restitution: 0.8,
    label: 'droneCircle',
    render : {
      fillStyle: option.color,
    }
  });
  circle.sound = option.sound;
  return circle;
}

export function createGravityCircle(
  x = Math.random() * 300,
  y = Math.random() * 400,
  radius = 90,
) {
  return Matter.Bodies.circle(x, y, radius, {
    density: 100,
    label: 'gravityCircle',
    isStatic: true,
    render: {
      fillStyle: 'black',
      lineWidth: 0,
      strokeStyle: 'white',
    },
    plugin: {
      attractors: [
        function(bodyA, bodyB) {
          return {
            x: (bodyA.position.x - bodyB.position.x) * 4e-6,
            y: (bodyA.position.y - bodyB.position.y) * 4e-6,
          }
        }
      ]
    }
  })
}