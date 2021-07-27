import Matter from 'matter-js'
import MatterAttractors from 'matter-attractors'
import {
  soundColorOptionsChord,
  soundColorOptionsDrone,
  soundColorOptionsPluck,
  soundColorOptionsOneShot,
} from './soundColorOptions'

Matter.use(MatterAttractors)

export interface UsefulBody extends Matter.Body {
  sound: string
  nextChord?: Function
  nextRandomNote?: Function
}

// helper functions
function selectRandomOption(option) {
  const optionKeys = Object.keys(option)
  const randomIndex = Math.floor(
    Matter.Common.random(1, Number(optionKeys[optionKeys.length - 1]) + 1)
  )
  return option[randomIndex]
}

// useful data store
let keyMemo: number

function randomAngle() {
  let angle = Math.random() * Math.PI * 2
  console.log(angle)
  return angle
}

function selectNextOption(option) {
  const optionKeys = Object.keys(option)
  function nextIndex() {
    if (!keyMemo || keyMemo + 1 > optionKeys.length) {
      keyMemo = Number(optionKeys[0])
      return option[keyMemo]
    } else if (keyMemo + 1 <= optionKeys.length) {
      keyMemo++
      return option[keyMemo]
    } else {
      console.log('error, selectNextOption function isnt working')
      return
    }
  }
  const nextChordOption = nextIndex()
  return nextChordOption
}

// create bodies
export function createChordRectangle(
  x = Math.random() * (window.innerWidth * 0.8),
  y = Math.random() * (window.innerHeight * 0.8),
  width = 40,
  height = 60
) {
  const option = selectNextOption(soundColorOptionsOneShot)
  const square: UsefulBody = Matter.Bodies.rectangle(x, y, width, height, {
    restitution: 2.5,
    collisionFilter: {
      group: -1,
    },
    render: {
      fillStyle: option.color,
    },
  })
  square.sound = option.sound
  square.nextChord = function () {
    const nextOption = selectNextOption(soundColorOptionsOneShot)
    return nextOption
  }
  return square
}

export function createCircle(
  x = Math.random() * (window.innerWidth * 0.8),
  y = Math.random() * (window.innerHeight * 0.8),
  radius = Math.random() * 30 + 10
) {
  const option = selectRandomOption(soundColorOptionsPluck)
  const circle: UsefulBody = Matter.Bodies.circle(x, y, radius, {
    restitution: 1.02,
    frictionAir: 0,
    friction: 0,
    frictionStatic: 0,
    collisionFilter: {
      group: -1,
    },
    render: {
      fillStyle: option.color,
    },
  })
  circle.sound = option.sound
  return circle
}

export function createRandomTriangle(
  x = Math.random() * (window.innerWidth * 0.8),
  y = Math.random() * (window.innerHeight * 0.8),
  radius = Math.random() * 30 + 20
) {
  const option = selectRandomOption(soundColorOptionsPluck)
  const triangle: UsefulBody = Matter.Bodies.polygon(x, y, 3, radius, {
    restitution: 1.1,
    frictionAir: 0,
    friction: 0,
    frictionStatic: 0,
    label: 'randomCircle',
    collisionFilter: {
      group: -1,
    },
    render: {
      fillStyle: option.color,
    },
  })
  triangle.sound = option.sound
  triangle.nextRandomNote = function () {
    const randomNote = selectRandomOption(soundColorOptionsPluck)
    return randomNote
  }
  return triangle
}

export function createDroneHexagon(
  x = window.innerWidth * 0.2,
  y = window.innerHeight * 0.2,
  radius = Math.random() * 20 + 40
) {
  const option = selectRandomOption(soundColorOptionsDrone)
  const circle: UsefulBody = Matter.Bodies.polygon(x, y, 6, Matter.Common.random(25, 40), {
    restitution: 0,
    collisionFilter: {
      group: -1,
    },
    label: 'droneCircle',
    render: {
      fillStyle: option.color,
    },
  })
  circle.sound = option.sound
  return circle
}

export function createGravityCircle(
  x = Math.random() * (window.innerWidth * 0.8),
  y = Math.random() * (window.innerHeight * 0.8),
  radius = 90
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
        function (bodyA, bodyB) {
          return {
            x: (bodyA.position.x - bodyB.position.x) * 4e-6,
            y: (bodyA.position.y - bodyB.position.y) * 4e-6,
          }
        },
      ],
    },
  })
}
