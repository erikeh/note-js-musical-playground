import { useEffect, useRef } from 'react';
import { useAppDispatch } from '../state/hooks';
import Controls from './Controls';
import { fixedSound, randomChord, drone1 } from './sounds';
import { debounce } from 'debounce';
import Matter, { Body, Engine, IEventCollision } from 'matter-js';
import { generateBackgroundColor } from '../utils/colorGen';
import {
  createCircle,
  createRandomTriangle,
  createDroneHexagon,
  createChordRectangle,
  createGravityCircle,
  SoundBody,
  TriangleSoundBody,
  RectangleSoundBody,
} from '../utils/bodies';
import allActions from '../state/actions/allActions';
import '@fortawesome/fontawesome-free/css/all.min.css';

Matter.use('matter-attractors');

export default function MatterMaker() {
  const {
    playedCircleInstructions,
    playedTriangleInstructions,
    playedGravityCircleInstructions,
    playedOneShotRectangleInstructions,
    playedDroneHexagonInstructions,
  } = allActions;

  const dispatch = useAppDispatch();
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

  // event handlers
  function handleNewCircleClick(): void {
    dispatch(playedCircleInstructions());
    Composite.add(engine.world, createCircle());
  }

  function handleNewRandomTriangleClick() {
    dispatch(playedTriangleInstructions());
    Composite.add(engine.world, createRandomTriangle());
  }

  function handleNewGravityCircleClick() {
    dispatch(playedGravityCircleInstructions());
    Composite.add(engine.world, createGravityCircle());
  }

  function handleNewDroneHexagonClick() {
    dispatch(playedDroneHexagonInstructions());
    Composite.add(engine.world, createDroneHexagon());
  }

  function handleNewOneShotRectangleClick() {
    dispatch(playedOneShotRectangleInstructions());
    Composite.add(engine.world, createChordRectangle());
  }

  function handleDeleteAllBodiesClick() {
    const allBodies = Composite.allBodies(engine.world);
    allBodies.forEach((body) => {
      if (body.label !== 'gravityCircle') {
        Composite.remove(engine.world, body);
      }
    });
  }
  // function handleGravityOn() {
  //   engine.gravity.y = 1;
  //   engine.gravity.scale = 0.001;
  //   console.log(engine.gravity);
  // }

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

    const gravityCircle = createGravityCircle(
      render.options.width! / 2,
      render.options.height! / 2
    );

    // collision handlers
    const handleCircleCollisionStart = (e: IEventCollision<Engine>) => {
      const bodyB = e.pairs[0].bodyB as SoundBody;
      fixedSound(bodyB.sound);
    };
    const handleTriangleCollisionStart = (e: IEventCollision<Engine>) => {
      const collidedTriangle = e.pairs[0].bodyB as TriangleSoundBody;
      fixedSound(collidedTriangle.sound);

      const nextNoteOption = collidedTriangle.nextRandomNote();
      collidedTriangle.render.fillStyle = nextNoteOption.color;
      (collidedTriangle as SoundBody).sound = nextNoteOption.sound;
    };
    const handleRectangleCollisionStart = (e: IEventCollision<Engine>) => {
      const collidedSquare = e.pairs[0].bodyB as RectangleSoundBody;
      randomChord(collidedSquare.sound);
      // preparing body for next bounce by changing chord & color
      const nextChordOption = collidedSquare.nextChord();
      collidedSquare.render.fillStyle = nextChordOption.color;
      collidedSquare.sound = nextChordOption.sound;
      render.options.background = `#${generateBackgroundColor()}`;
    };
    const handleHexagonCollisionStart = (e: IEventCollision<Engine>) => {
      drone1.play();
      drone1.fade(0, 0.5, 120);
      Composite.allBodies(engine.world).forEach((body) => {
        if (body.label === 'gravityCircle') {
          body.render.fillStyle = '#79ADDC';
        }
      });
    };
    const handleDroneCollisionEnd = (e: IEventCollision<Engine>) => {
      drone1.fade(0.5, 0, 50);
      drone1.once('fade', drone1.pause);
      Composite.allBodies(engine.world).forEach((body) => {
        if (body.label === 'gravityCircle') {
          body.render.fillStyle = 'black';
        }
      });
    };

    const debouncedHandleCircleCollisionStart = debounce(handleCircleCollisionStart, 10, true);
    const debouncedHandleTriangleCollisionStart = debounce(handleTriangleCollisionStart, 10, true);
    const debouncedHandleRectangleCollisionStart = debounce(
      handleRectangleCollisionStart,
      800,
      true
    );
    const debouncedHandleHexagonCollisionStart = debounce(handleHexagonCollisionStart, 100, true);

    /** library for collision handlers.
     * MatterJS does not support per-body collision detection,
     * recommnded solution was to iterate through all collision events
     * and search for the one looking for, but creating handler "library"
     * was much more efficient */
    const collisionStartHandlers = {
      circle: debouncedHandleCircleCollisionStart,
      triangle: debouncedHandleTriangleCollisionStart,
      rectangle: debouncedHandleRectangleCollisionStart,
      hexagon: debouncedHandleHexagonCollisionStart,
    };

    const collisionEndHandlers = {
      hexagon: handleDroneCollisionEnd,
    };

    // event listeners
    Events.on(engine, 'collisionStart', (e) => {
      const collidedBody = e.pairs[0].bodyB;
      const handler = (collisionStartHandlers as any)[collidedBody.label] || function () {};
      handler(e);
    });

    Events.on(engine, 'collisionActive', (e) => {
      const bodyA = e.pairs[0].bodyA;
      const bodyB = e.pairs[0].bodyB;
      if (bodyA.label === 'gravityCircle' && bodyB.label === 'droneCircle') {
        // leaving empty for other planned features
      }
    });

    Events.on(engine, 'collisionEnd', (e) => {
      const collidedBody = e.pairs[0].bodyB;
      const handler = (collisionEndHandlers as any)[collidedBody.label] || function () {};
      handler();
    });

    // deletes bodies that move outside of the current screen range
    Events.on(engine, 'afterUpdate', () => {
      const height = render.options.height;
      const width = render.options.width;

      Composite.allBodies(engine.world).forEach((body) => {
        if (
          body.position.y > height! + 40 ||
          body.position.y < -40 ||
          body.position.x > width! + 40 ||
          body.position.x < -40
        ) {
          Composite.remove(engine.world, body);
        }
      });
    });

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    Events.on(mouseConstraint, 'mousedown', (e) => {
      const clickedBody = e.source.body;
      if (clickedBody?.label === 'gravityCircle') {
        Body.setStatic(clickedBody, false);
      } else {
        return;
      }
    });

    Events.on(mouseConstraint, 'mouseup', (e) => {
      const allBodies = Composite.allBodies(engine.world);
      for (let body of allBodies) {
        if (body.label === 'gravityCircle' && !body.isStatic) {
          Body.setStatic(body, true);
        }
      }
    });

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
    return () => {
      Render.stop(render);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, [Composite, Engine, Events, Mouse, MouseConstraint, Render, Runner, engine]);

  return (
    <div ref={canvasRef}>
      <Controls
        handleNewCircleClick={handleNewCircleClick}
        handleNewRandomTriangleClick={handleNewRandomTriangleClick}
        handleNewDroneHexagonClick={handleNewDroneHexagonClick}
        handleNewGravityCircleClick={handleNewGravityCircleClick}
        handleNewOneShotRectangleClick={handleNewOneShotRectangleClick}
        handleDeleteAllBodiesClick={handleDeleteAllBodiesClick}
      />
    </div>
  );
}
