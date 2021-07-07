import Matter from 'matter-js';
import MatterAttractors from 'matter-attractors';
Matter.use(MatterAttractors);

interface usefulBody extends Matter.Body {
  sound?: string;
}

const soundColorOptionsDrone = {
  1: {
    sound: 'drone1',
    color: '#6D466B'
  },
  2: {
    sound: 'drone2',
    color: '#B49FCC'
  },
}

const soundColorOptions = {
  1: {
    sound: 'notes1',
    color: '#EB9486'
  },
  2: {
    sound: 'notes2',
    color: '#D5573B',
  },
  3: {
    sound: 'notes3',
    color: '#885053'
  },
  4: {
    sound: 'notes4',
    color: '#80A1C1'
  },
  5: {
    sound: 'notes4',
    color: '#D5CAD6'
  },
  6: {
    sound: 'notes3',
    color: '#80A1C1'
  },
}
function selectRandomOption(option) {
  const optionKeys = Object.keys(option)
  const randomIndex = Math.floor(Matter.Common.random(1, Number(optionKeys[optionKeys.length - 1]) + 1))
  console.log(randomIndex)
  return option[randomIndex]
}

export function createSquare(
  x = Math.random() * 400,
  y = Math.random() * 400,
  width = Math.random() * 80 + 10,
  height = Math.random() * 80 + 10
) {
  return Matter.Bodies.rectangle(x, y, width, height);
}

export function createCircle(
  x = Math.random() * 200 + 200,
  y = Math.random() * 200,
  radius = Math.random() * 60 + 10
) {
  const option = selectRandomOption(soundColorOptions);
  const circle: usefulBody = Matter.Bodies.circle(x, y, radius, {
    restitution: 0.8,
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
  const circle: usefulBody = Matter.Bodies.circle(x, y, radius, {
    restitution: 0.8,
    render : {
      fillStyle: option.color,
    }
  });
  circle.sound = option.sound;
  return circle;
}

export function createGravityCircle(
  x = 300,
  y = 400,
  radius = 90,
) {
  return Matter.Bodies.circle(x, y, radius, {
    render: {
      fillStyle: 'black',
      lineWidth: 0,
      strokeStyle: 'white',
    },
    plugin: {
      attractors: [
        function(bodyA, bodyB) {
          return {
            x: (bodyA.position.x - bodyB.position.x) * 1e-5,
            y: (bodyA.position.y - bodyB.position.y) * 1e-5,
          }
        }
      ]
    }
  })
}