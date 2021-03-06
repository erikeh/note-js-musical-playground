import Matter from 'matter-js';
import MatterAttractors from 'matter-attractors';
import {
  soundColorOptionsDrone,
  soundColorOptionsPluck,
  soundColorOptionsOneShot,
} from './soundColorOptions';
import { selectRandomOption, selectNextOption } from './orderLogic';
import { circleColorGen } from './colorGen';

Matter.use(MatterAttractors);

export interface SoundBody extends Matter.Body {
  sound: string;
}
export interface TriangleSoundBody extends SoundBody {
  nextRandomNote: Function;
}
export interface RectangleSoundBody extends SoundBody {
  nextChord: Function;
}

// create bodies
export function createCircle(
  x = Math.random() * (window.innerWidth * 0.8),
  y = Math.random() * (window.innerHeight * 0.8),
  radius = Math.random() * 30 + 10
): SoundBody {
  const option = selectRandomOption(soundColorOptionsPluck);
  const circle = Matter.Bodies.circle(x, y, radius, {
    restitution: 1.02,
    frictionAir: 0,
    friction: 0,
    frictionStatic: 0,
    collisionFilter: {
      group: -1,
    },
    label: 'circle',
    render: {
      fillStyle: option.color,
    },
  });
  (circle as SoundBody).sound = option.sound;
  return circle as SoundBody;
}

export function createRandomTriangle(
  x = Math.random() * (window.innerWidth * 0.8),
  y = Math.random() * (window.innerHeight * 0.8),
  radius = Math.random() * 30 + 20
): TriangleSoundBody {
  const option = selectRandomOption(soundColorOptionsPluck);
  const triangle = Matter.Bodies.polygon(x, y, 3, radius, {
    restitution: 1.1,
    frictionAir: 0,
    friction: 0,
    frictionStatic: 0,
    label: 'triangle',
    collisionFilter: {
      group: -1,
    },
    render: {
      fillStyle: option.color,
    },
  });
  (triangle as TriangleSoundBody).sound = option.sound;
  (triangle as TriangleSoundBody).nextRandomNote = function () {
    const randomNote = selectRandomOption(soundColorOptionsPluck);
    return randomNote;
  };
  return triangle as TriangleSoundBody;
}

export function createGravityCircle(
  x = Math.random() * (window.innerWidth * 0.8),
  y = Math.random() * (window.innerHeight * 0.8),
  radius = Math.random() * 90 + 50
) {
  return Matter.Bodies.circle(x, y, radius, {
    density: 1000000000000,
    label: 'gravityCircle',
    isStatic: true,
    render: {
      fillStyle: 'black',
      lineWidth: 0,
      strokeStyle: 'white',
    },
    plugin: {
      attractors: [
        function (bodyA: Matter.Body, bodyB: Matter.Body) {
          return {
            x: (bodyA.position.x - bodyB.position.x) * 4e-6,
            y: (bodyA.position.y - bodyB.position.y) * 4e-6,
          };
        },
      ],
    },
  });
}

export function createDroneHexagon(
  x = window.innerWidth * 0.2,
  y = window.innerHeight * 0.2,
  radius = Math.random() * 20 + 40
): SoundBody {
  const option = selectRandomOption(soundColorOptionsDrone);
  const hexagon = Matter.Bodies.polygon(x, y, 6, Matter.Common.random(25, 40), {
    restitution: 0,
    collisionFilter: {
      group: -1,
    },
    label: 'hexagon',
    render: {
      fillStyle: option.color,
    },
  });
  (hexagon as SoundBody).sound = option.sound;
  return hexagon as SoundBody;
}

export function createChordRectangle(
  x = Math.random() * (window.innerWidth * 0.8),
  y = Math.random() * (window.innerHeight * 0.8),
  width = 40,
  height = 60
): RectangleSoundBody {
  const option = selectNextOption(soundColorOptionsOneShot);
  const rectangle = Matter.Bodies.rectangle(x, y, width, height, {
    restitution: 2.5,
    collisionFilter: {
      group: -1,
    },
    label: 'rectangle',
    render: {
      fillStyle: option.color,
    },
  });
  (rectangle as RectangleSoundBody).sound = option.sound;
  (rectangle as RectangleSoundBody).nextChord = function () {
    const nextOption = selectNextOption(soundColorOptionsOneShot);
    return nextOption;
  };
  return rectangle as RectangleSoundBody;
}
