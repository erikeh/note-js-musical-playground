import React, { useState, useEffect, useRef } from 'react'
import { Howl, Howler } from 'howler';
import randomDrum from './drums';
import { debounce } from 'debounce';
import Matter from 'matter-js';
import { bgColorGen } from '../utils/colorGen';



export default function MatterMaker() {
  const [ isBlue, setIsBlue ] = useState(false);
  const [ kickDelay, setKickDelay ] = useState(false)
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

  // create two boxes and a ground
  const boxA = Bodies.rectangle(400, 200, 80, 80);
  const boxB = Bodies.rectangle(450, 50, 80, 80, {
    render: {
      fillStyle: '#348AA7',
      strokeStyle: 'black'
    }
  });
  const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

  // event handlers
  const handleCollision = () => {
    randomDrum();
    boxB.render.fillStyle = `#${bgColorGen()}`
    setBackgroundColor(bgColorGen());
  }
  const debouncedHandleCollision = debounce(handleCollision, 200, true);


  useEffect(() => {
    // create an engine
    const engine = Engine.create();

    // event listeners
    Events.on(engine, 'collisionStart', debouncedHandleCollision);

    // create a renderer
    const render = Render.create({
    element: canvasRef.current || document.body,
    engine: engine,
    options: {
      wireframes: false,
      wireframeBackground: `#${backgroundColor}`,
    },
    });



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

    // add all of the bodies to the world
    Composite.add(engine.world, [boxA, boxB, ground]);
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
      {isBlue ? <p style={{ color: 'red' }}>hello</p> : <p>hello</p>}
    </div>
  )
}
