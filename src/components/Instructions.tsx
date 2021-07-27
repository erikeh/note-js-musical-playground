import { useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { motion, useAnimation } from 'framer-motion';
import allActions from '../actions/allActions';
import styled from 'styled-components';

const InstructionsContainer = styled(motion.h3)`
  position: absolute;
  top: 100px;
`;

interface InstructionsProp {}

const Instructions = (props: InstructionsProp) => {
  const dispatch = useAppDispatch();
  const {
    playingCircleInstructions,
    playingTriangleInstructions,
    playingGravityCircleInstructions,
    playingOneShotRectangleInstructions,
    playingDroneHexagonInstructions,
  } = allActions;

  const circleControlsClicked = useAppSelector(
    (state) => state.animationStatus.playedCircleInstructions
  );
  const triangleControlsClicked = useAppSelector(
    (state) => state.animationStatus.playedTriangleInstructions
  );
  const gravityCircleControlsClicked = useAppSelector(
    (state) => state.animationStatus.playedGravityCircleInstructions
  );
  const droneHexagonControlsClicked = useAppSelector(
    (state) => state.animationStatus.playedDroneHexagonInstructions
  );
  const oneShotRectangleControlsclicked = useAppSelector(
    (state) => state.animationStatus.playedOneShotRectangleInstructions
  );

  // instructions and its animation controls
  const circleLine1 =
    'Circles are consistent. They like to pick one note and keep playing it';
  const circleLine2 = `throw it away if you don't like what it's playing`;
  const circleInstructionsControl = useAnimation();

  const triangleLine1 = `Triangles are unpredictable...`;
  const triangleLine2 = `even the notes they play are random`;
  const triangleInstructionsControl = useAnimation();

  const gravityCircleLine1 = `Did you know you can move the black circle with your mouse?`;
  const gravityCircleInstructionsControl = useAnimation();

  const droneHexagonLine1 = `The hexagon doesn't like craziness..`;
  const droneHexagonLine2 = `it will only play as long as it is touching the black circle`;
  const droneHexagonInstructionsControl = useAnimation();

  const oneShotRectangleLine1 = `The rectangle likes flashy entrances`;
  const oneShotRectangleLine2 = `enjoy what the rectangle has prepared for you`;
  const oneShotRectangleInstructionsControl = useAnimation();

  // handlers
  const handleCircleAnimationStart = useCallback(async () => {
    dispatch(playingCircleInstructions(true));
    await circleInstructionsControl.start('visible');
    await new Promise((r) => setTimeout(r, 2000));
    await circleInstructionsControl.start('hidden');
    dispatch(playingCircleInstructions(false));
  }, [dispatch, circleInstructionsControl, playingCircleInstructions]);

  const handleTriangleAnimationStart = useCallback(async () => {
    dispatch(playingTriangleInstructions(true));
    await triangleInstructionsControl.start('visible');
    await new Promise((r) => setTimeout(r, 2000));
    await triangleInstructionsControl.start('hidden');
    dispatch(playingTriangleInstructions(false));
  }, [dispatch, playingTriangleInstructions, triangleInstructionsControl]);

  const handleGravityCircleAnimationStart = useCallback(async () => {
    dispatch(playingGravityCircleInstructions(true));
    await gravityCircleInstructionsControl.start('visible');
    await new Promise((r) => setTimeout(r, 2000));
    await gravityCircleInstructionsControl.start('hidden');
    dispatch(playingGravityCircleInstructions(false));
  }, [dispatch, gravityCircleInstructionsControl, playingGravityCircleInstructions]);

  const handleDroneHexagonAnimationStart = useCallback(async () => {
    dispatch(playingDroneHexagonInstructions(true));
    await droneHexagonInstructionsControl.start('visible');
    await new Promise((r) => setTimeout(r, 2000));
    await droneHexagonInstructionsControl.start('hidden');
    dispatch(playingDroneHexagonInstructions(false));
  }, [dispatch, droneHexagonInstructionsControl, playingDroneHexagonInstructions]);

  const handleOneShotRectangleAnimationStart = useCallback(async () => {
    dispatch(playingOneShotRectangleInstructions(true));
    await oneShotRectangleInstructionsControl.start('visible');
    await new Promise((r) => setTimeout(r, 2000));
    await oneShotRectangleInstructionsControl.start('hidden');
    dispatch(playingOneShotRectangleInstructions(false));
  }, [
    dispatch,
    oneShotRectangleInstructionsControl,
    playingOneShotRectangleInstructions,
  ]);

  /** states break matterJS if used on MatterMaker.tsx.
   * Current workaround for handling clicks from MatterMaker to other components
   * is using redux and "listening" to change in states via useEffect.
   * It is hacky, but the best way as of this moment*/

  useEffect(() => {
    if (circleControlsClicked) {
      handleCircleAnimationStart();
    }
  }, [circleControlsClicked, handleCircleAnimationStart]);

  useEffect(() => {
    if (triangleControlsClicked) {
      handleTriangleAnimationStart();
    }
  }, [triangleControlsClicked, handleTriangleAnimationStart]);

  useEffect(() => {
    if (gravityCircleControlsClicked) {
      handleGravityCircleAnimationStart();
    }
  }, [gravityCircleControlsClicked, handleGravityCircleAnimationStart]);

  useEffect(() => {
    if (droneHexagonControlsClicked) {
      handleDroneHexagonAnimationStart();
    }
  }, [droneHexagonControlsClicked, handleDroneHexagonAnimationStart]);

  useEffect(() => {
    if (oneShotRectangleControlsclicked) {
      handleOneShotRectangleAnimationStart();
    }
  }, [oneShotRectangleControlsclicked, handleOneShotRectangleAnimationStart]);

  // variants
  const sentence = {
    hidden: {
      opacity: 1,
      transition: {
        delay: 0.9,
        staggerChildren: 0.01,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.05,
      },
    },
  };
  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  // create sentence animation components
  const circleSentence1 = circleLine1.split('').map((char, idx) => (
    <motion.span key={char + '-' + idx} variants={letter}>
      {char}
    </motion.span>
  ));
  const circleSentence2 = circleLine2.split('').map((char, idx) => (
    <motion.span key={char + '-' + idx} variants={letter}>
      {char}
    </motion.span>
  ));
  const triangleSentence1 = triangleLine1.split('').map((char, idx) => (
    <motion.span key={char + '-' + idx} variants={letter}>
      {char}
    </motion.span>
  ));
  const triangleSentence2 = triangleLine2.split('').map((char, idx) => (
    <motion.span key={char + '-' + idx} variants={letter}>
      {char}
    </motion.span>
  ));
  const gravityCircleSentence1 = gravityCircleLine1.split('').map((char, idx) => (
    <motion.span key={char + '-' + idx} variants={letter}>
      {char}
    </motion.span>
  ));
  const droneHexagonSentence1 = droneHexagonLine1.split('').map((char, idx) => (
    <motion.span key={char + '-' + idx} variants={letter}>
      {char}
    </motion.span>
  ));
  const droneHexagonSentence2 = droneHexagonLine2.split('').map((char, idx) => (
    <motion.span key={char + '-' + idx} variants={letter}>
      {char}
    </motion.span>
  ));

  const oneShotRectangleSentence1 = oneShotRectangleLine1.split('').map((char, idx) => (
    <motion.span key={char + '-' + idx} variants={letter}>
      {char}
    </motion.span>
  ));
  const oneShotRectangleSentence2 = oneShotRectangleLine2.split('').map((char, idx) => (
    <motion.span key={char + '-' + idx} variants={letter}>
      {char}
    </motion.span>
  ));

  return (
    <>
      <InstructionsContainer
        variants={sentence}
        initial="hidden"
        animate={circleInstructionsControl}
      >
        {circleSentence1}
        <br />
        {circleSentence2}
      </InstructionsContainer>

      <InstructionsContainer
        variants={sentence}
        initial="hidden"
        animate={triangleInstructionsControl}
      >
        {triangleSentence1}
        <br />
        {triangleSentence2}
      </InstructionsContainer>

      <InstructionsContainer
        variants={sentence}
        initial="hidden"
        animate={gravityCircleInstructionsControl}
      >
        {gravityCircleSentence1}
      </InstructionsContainer>

      <InstructionsContainer
        variants={sentence}
        initial="hidden"
        animate={droneHexagonInstructionsControl}
      >
        {droneHexagonSentence1}
        <br />
        {droneHexagonSentence2}
      </InstructionsContainer>

      <InstructionsContainer
        variants={sentence}
        initial="hidden"
        animate={oneShotRectangleInstructionsControl}
      >
        {oneShotRectangleSentence1}
        <br />
        {oneShotRectangleSentence2}
      </InstructionsContainer>
    </>
  );
};

export default Instructions;
