import React, { useState, useEffect, useRef } from 'react'
import {randomSound, randomChord } from './sounds';
import { debounce } from 'debounce';
import Matter, { Body } from 'matter-js';
import { bgColorGen } from '../utils/colorGen';
import { createSquare, createCircle, createDroneCircle, createChordSquare, createGravityCircle } from './bodies';
import styled from 'styled-components';

Matter.use('matter-attractors');

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`
const AbsoluteContainer = styled.div`
  position: absolute;
`

export default function MatterMaker() {
  const [ gravityIsOn, setGravityIsOn] = useState(false);
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

  // event handlers
  function handleNewCircleClick() {
    Composite.add(engine.world, createCircle())
  }
  function handleNewDroneCircleClick() {
    Composite.add(engine.world, createDroneCircle())
  }
  function handleNewGravityCircleClick() {
    Composite.add(engine.world, createGravityCircle())
  }
  function handleNewChordSquareClick() {
    Composite.add(engine.world, createChordSquare())
  }
  function handleDeleteAllBodiesClick() {
    const allBodies = Composite.allBodies(engine.world);
    allBodies.forEach(body => {
      if (body.label !== 'gravityCircle') {
        Composite.remove(engine.world, body)
      }
    })
  }
  function handleGravityOn() {
    engine.gravity.y = 1;
    engine.gravity.scale = 0.001;
    console.log(engine.gravity);
    setGravityIsOn(prevState => !prevState)
  }

  useEffect(() => {
    // create a renderer
    const render = Render.create({
      element: canvasRef.current || document.body,
      engine: engine,
      options: {
        wireframes: false,
        background: `white`,
        height: window.innerHeight,
        width: window.innerWidth,
      },
    });

    const gravityCircle = createGravityCircle(render.options.width / 2, render.options.height / 2)

     // collision handlers
    const handleNoteCollisionStart = (e) => {
      // console.log('event:', e.pairs[0]);
      const bodyB = e.pairs[0].bodyB;
      randomSound(bodyB.sound);
    }
    const handleChordCollisionStart = (e) => {
      const collidedSquare = e.pairs[0].bodyB;
      randomChord(collidedSquare.sound);
      // preparing body for next bounce by changing chord & color
      const nextChordOption = collidedSquare.nextChord();
      collidedSquare.render.fillStyle = nextChordOption.color;
      collidedSquare.sound = nextChordOption.sound;
      render.options.background = `#${bgColorGen()}`
    }
    const handleDroneCollisionStart = (e) => {
      const pairs = e.pairs[0]
      console.log('drone objects: ', pairs)
      const collidedCircle = e.pairs[0].bodyB;
      randomSound(collidedCircle.sound);
    }
    const handleCollisionEnd = (e) => {
      const bodyA = e.pairs[0].bodyA;
      const bodyB = e.pairs[0].bodyB;

      randomSound(bodyB.sound);
        // boxB.render.fillStyle = `#${bgColorGen()}`
      render.options.background = `#${bgColorGen()}`
    }

    const debouncedHandleNoteCollisionStart = debounce(handleNoteCollisionStart, 10, true);
    const debouncedHandleChordCollisionStart = debounce(handleChordCollisionStart, 1000, true);
    const debouncedHandleDroneCollisionStart = debounce(handleDroneCollisionStart, 5000, true)

    // event listeners
    Events.on(engine, 'collisionStart', (e) => {
      const pairs = e.pairs[0];
      if (pairs.bodyB.label === 'Rectangle Body') {
        debouncedHandleChordCollisionStart(e)
      } else if (pairs.bodyB.label === 'droneCircle' || pairs.bodyA.label === 'droneCircle') {
        debouncedHandleDroneCollisionStart(e)
      } else {
        debouncedHandleNoteCollisionStart(e)
      }
    });

    Events.on(engine, 'afterUpdate', () => {
      const height = render.options.height;
      const width = render.options.width;

      Composite.allBodies(engine.world).forEach(body => {
        if (body.position.y > height + 40 || body.position.y < -40 || body.position.x > width + 40 || body.position.x < -40) {
          Composite.remove(engine.world, body)
        }
      })
    })


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

    Events.on(mouseConstraint, 'mousedown', (e) => {
      const allBodies = Composite.allBodies(engine.world);
      for (let body of allBodies) {
        if (body.label === 'gravityCircle') {
          Body.setStatic(body, false)
        }
      }
    })
    Events.on(mouseConstraint, 'mouseup', (e) => {
      const allBodies = Composite.allBodies(engine.world);
      for (let body of allBodies) {
        if (body.label === 'gravityCircle') {
          Body.setStatic(body, true)
        }
      }
    })

    engine.gravity.y = 0;
    // add all of the bodies to the world
    Composite.add(engine.world, [gravityCircle]);
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
      <ButtonContainer>
        <AbsoluteContainer>
          <button onClick={handleNewCircleClick}>new circle</button>
          <button onClick={handleNewGravityCircleClick}>more black holes</button>
          <button onClick ={handleNewChordSquareClick}>Chord</button>
          <button onClick ={handleNewDroneCircleClick}>Drones</button>
          <button onClick={handleGravityOn}>Gravity on</button>
          <button onClick={handleDeleteAllBodiesClick}>Delete small balls</button>
        </AbsoluteContainer>
      </ButtonContainer>
    </div>
  )
}
