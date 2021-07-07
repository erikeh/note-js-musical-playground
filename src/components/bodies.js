import Matter from 'matter-js';

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
  return Matter.Bodies.circle(x, y, radius);
}