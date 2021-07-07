import React, { useState, useEffect, useRef } from 'react'

import randomDrum from './drums';
import { debounce } from 'debounce';
import Matter from 'matter-js';
import { bgColorGen } from '../utils/colorGen';
import { createSquare, createCircle, createGravityCircle } from './bodies';

Matter.use('matter-attractors');

export default function MatterMaker() {
  const [ isBlue, setIsBlue ] = useState(false);
  const [ backgroundColor, setBackgroundColor ] = useState('BCE784')
  const canvasRef = useRef(null);

  // Matter aliases
  const Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Events = Matter.Events,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;

  // create an engine
  const engine = Engine.create();

  // create bodies
  const ground1 = Bodies.rectangle(600, 610, 810, 30, {
    isStatic: true,
    // angle: 2.3561944902
  });
  const ground2 = Bodies.rectangle(200, 410, 310, 30, {
    isStatic: true,
    angle: 0.7853981634
  });
  const boxA = Bodies.rectangle(400, 200, 80, 80);
  const boxC = Bodies.rectangle(400, 20, 80, 80);
  const boxB = Bodies.rectangle(450, 50, 80, 80, {
    render: {
      fillStyle: 'orange',
      strokeStyle: 'black'
    }
  });

  function handleNewSquareClick() {
    Composite.add(engine.world, createSquare())
  }
  function handleNewCircleClick() {
    Composite.add(engine.world, createCircle())
  }
  function handleNewGravityCircleClick() {
    Composite.add(engine.world, createGravityCircle())
  }

  useEffect(() => {
    // create a renderer
    const render = Render.create({
      element: canvasRef.current || document.body,
      engine: engine,
      options: {
        wireframes: false,
        background: `#${backgroundColor}`,
      },
    });

     // event handlers
    const handleCollision = (e) => {
      const bodyA = e.pairs[0].bodyA;
      const bodyB = e.pairs[0].bodyB;
      console.log(bodyA)
      if (bodyA.label !== 'Rectangle Body' && bodyB.label !== 'Rectangle Body') {
        randomDrum();
        // boxB.render.fillStyle = `#${bgColorGen()}`
        render.options.background = `#${bgColorGen()}`
      }
    }
    const debouncedHandleCollision = debounce(handleCollision, 50, true);



    // event listeners
    Events.on(engine, 'collisionStart', (e) => debouncedHandleCollision(e));

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

    engine.gravity.scale = 0;
    // add all of the bodies to the world
    Composite.add(engine.world, [ground1]);
    Composite.add(engine.world, mouseConstraint);
    // run the renderer
    Render.run(render);
    // create runner
    const runner = Runner.create();
    // run the engine
    Runner.run(runner, engine);
  }, [])

  return (
    <div ref={canvasRef}>
      <button onClick={handleNewSquareClick}>new square</button>
      <button onClick={handleNewCircleClick}>new circle</button>
      <button onClick={handleNewGravityCircleClick}>GRAVITY</button>
      {isBlue ? <p style={{ color: 'red' }}>hello</p> : <p>hello</p>}
    </div>
  )
}
