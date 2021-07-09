import React, { useEffect, useRef } from 'react'
import { fixedSound, randomChord, drone1 } from './sounds';
import { debounce } from 'debounce';
import Matter, { Body } from 'matter-js';
import { bgColorGen } from '../utils/colorGen';
import { createCircle, createRandomTriangle, createDroneCircle, createChordSquare, createGravityCircle } from './bodies';
import styled from 'styled-components';
import { Button, Icon } from 'bulma-styled-components';
import { motion } from 'framer-motion'
import '@fortawesome/fontawesome-free/css/all.min.css';

Matter.use('matter-attractors');

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`
const AbsoluteContainer = styled.div`
  position: absolute;
`
const MainButton = styled(Button)`
  height: 30px;
  border-radius: 2px;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`

const IconButton = styled(Icon)`
  font-size: 25px;
  padding: 15px 25px 0 25px;
  &:hover {
    cursor: pointer;
  }
`


export default function MatterMaker(props) {
  const {
    handleBallAnimationStart,
    handleTriangleAnimationStart,
    handleGravityBallAnimationStart,
    handleDroneHexagonAnimationStart,
    handleOneShotRectangleAnimationStart,
  } = props
  const canvasRef = useRef(null);

  // Matter aliases
  const Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Composite = Matter.Composite,
  Events = Matter.Events,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;

  // create an engine
  const engine = Engine.create();

  let playedBall = false;
  let playedTriangle = false;
  let playedGravityBall = false;
  let playedOneShot = false;
  let playedDrone = false;


  // event handlers
  function handleNewCircleClick() {
    if (!playedBall) {
      handleBallAnimationStart();
      playedBall = true;
    }
    Composite.add(engine.world, createCircle())
  }

  function handleNewRandomTriangleClick() {
    if (!playedTriangle) {
      handleTriangleAnimationStart();
      playedTriangle = true;
    }
    Composite.add(engine.world, createRandomTriangle())
  }

  function handleNewDroneCircleClick() {
    if (!playedDrone) {
      handleDroneHexagonAnimationStart();
      playedDrone = true;
    }
    Composite.add(engine.world, createDroneCircle())
  }

  function handleNewGravityCircleClick() {
    if (!playedGravityBall) {
      handleGravityBallAnimationStart();
      playedGravityBall = true;
    }
    Composite.add(engine.world, createGravityCircle())
  }

  function handleNewOneShotRectangleClick() {
    if (!playedOneShot) {
      handleOneShotRectangleAnimationStart();
      playedOneShot = true;
    }
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
  }

  useEffect(() => {
    console.log('innerwidth', window.innerWidth)
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
      const bodyB = e.pairs[0].bodyB;
      fixedSound(bodyB.sound);
    }
    const handleRandomNoteCollisionStart = (e) => {
      const collidedTriangle = e.pairs[0].bodyB;
      fixedSound(collidedTriangle.sound);

      const nextNoteOption = collidedTriangle.nextRandomNote();
      collidedTriangle.render.fillStyle = nextNoteOption.color;
      collidedTriangle.sound = nextNoteOption.sound;
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
      drone1.play();
      drone1.fade(0, 0.5, 120)
      gravityCircle.render.fillStyle = '#79ADDC';
    }
    const handleDroneCollisionEnd = (e) => {
      drone1.fade(0.5, 0, 50)
      drone1.once('fade', drone1.pause)
      gravityCircle.render.fillStyle = 'black';
    }

    const debouncedHandleNoteCollisionStart = debounce(handleNoteCollisionStart, 10, true);
    const debouncedHandleRandomNoteCollisionStart = debounce(handleRandomNoteCollisionStart, 10, true);
    const debouncedHandleChordCollisionStart = debounce(handleChordCollisionStart, 800, true);
    const debouncedHandleDroneCollisionStart = debounce(handleDroneCollisionStart, 100, true)


    // event listeners
    Events.on(engine, 'collisionStart', (e) => {
      const pairs = e.pairs[0];
      if (pairs.bodyB.label === 'Rectangle Body') {
        debouncedHandleChordCollisionStart(e);
      } else if (pairs.bodyB.label === 'droneCircle') {
        debouncedHandleDroneCollisionStart(e);
      } else if (pairs.bodyB.label === 'randomCircle') {
        debouncedHandleRandomNoteCollisionStart(e);
      } else {
        debouncedHandleNoteCollisionStart(e);
      }
    });

    Events.on(engine, 'collisionActive', (e) => {
      const bodyA = e.pairs[0].bodyA
      const bodyB = e.pairs[0].bodyB
      if (bodyA.label === 'gravityCircle' && bodyB.label === 'droneCircle') {

      }
    })
    Events.on(engine, 'collisionEnd', (e) => {
      const bodyB = e.pairs[0].bodyB;
        if (bodyB.label === 'droneCircle') {
          handleDroneCollisionEnd(e)
        }
    })

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
          <IconButton onClick={handleNewCircleClick}>
            <motion.i
              className="fa fa-music"
              whileHover={{ scale: 1.1 }}
            />
          </IconButton>
          <IconButton onClick={handleNewRandomTriangleClick}>
            <motion.i
              className="fas fa-exclamation-triangle"
              whileHover={{ scale: 1.1 }}
            />
          </IconButton>
          <IconButton onClick={handleNewGravityCircleClick}>
            <motion.i
              className="fas fa-circle"
              whileHover={{ scale: 1.1 }}
            />
          </IconButton>
          <IconButton onClick={handleNewDroneCircleClick}>
            <motion.i
              className="fas fa-om"
              whileHover={{ scale: 1.1 }}
            />
          </IconButton>
          <IconButton onClick={handleNewOneShotRectangleClick}>
            <motion.i
              className="fas fa-bahai"
              whileHover={{ scale: 1.1 }}
            />
          </IconButton>
          <IconButton onClick={handleDeleteAllBodiesClick}>
            <motion.i
              className="far fa-trash-alt"
              whileHover={{ scale: 1.1 }}
            />
          </IconButton>
        </AbsoluteContainer>
      </ButtonContainer>
    </div>
  )
}
