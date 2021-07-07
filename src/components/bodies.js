import Matter from 'matter-js';
import MatterAttractors from 'matter-attractors';
Matter.use(MatterAttractors);

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
  return Matter.Bodies.circle(x, y, radius, {
    restitution: 0.8,
  });
}

export function createGravityCircle(
  x = 200,
  y = 200,
  radius = 30,
) {
  return Matter.Bodies.circle(x, y, radius, {
    plugin: {
      attractors: [
        function(bodyA, bodyB) {
          return {
            x: (bodyA.position.x - bodyB.position.x) * 1e-6,
            y: (bodyA.position.y - bodyB.position.y) * 1e-6,
          }
        }
      ]
    }
  })
}