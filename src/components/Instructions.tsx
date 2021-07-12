import React from 'react';
import { AnimationControls, motion, useAnimation } from 'framer-motion';
import styled from 'styled-components';

const InstructionsContainer = styled(motion.h3)`
  position: absolute;
  top: 100px;
`

interface InstructionsProp {
  handleBallAnimationStart: ()=> Promise<void>,
  handleTriangleAnimationStart: ()=> Promise<void>,
  handleGravityBallAnimationStart: ()=> Promise<void>,
  handleDroneHexagonAnimationStart: ()=> Promise<void>,
  handleOneShotRectangleAnimationStart: ()=> Promise<void>,
}

const Instructions = (props: InstructionsProp) => {
  const {
    handleBallAnimationStart,
    handleTriangleAnimationStart,
    handleGravityBallAnimationStart,
    handleDroneHexagonAnimationStart,
    handleOneShotRectangleAnimationStart,
  } = props;

  const ballLine1 = 'Balls are consistent. They like to pick one note and keep playing it'
  const ballLine2 = `throw it away if you don't like what it's playing`
  const ballInstructionsControl = useAnimation();

  const triangleLine1 = `Triangles are unpredictable...`
  const triangleLine2 = `even the notes they play are random`
  const triangleInstructionsControl = useAnimation();

  const gravityBallLine1 = `Did you know you can move the black ball with your mouse?`
  const gravityBallInstructionsControl = useAnimation();

  const droneHexagonLine1 = `The hexagon doesn't like craziness..`
  const droneHexagonLine2 = `it will only play as long as it is touching the black ball`
  const droneHexagonInstructionsControl = useAnimation();

  const oneShotRectangleLine1 = `The rectangle likes flashy entrances`;
  const oneShotRectangleLine2 = `enjoy what the rectangle has prepared for you`;
  const oneShotRectangleInstructionsControl = useAnimation();

  // variants
  const sentence = {
    hidden: {
      opacity: 1,
      transition: {
        delay: 0.9,
        staggerChildren: 0.01,
      }
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.05,
      },
    },
  }
  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    }
  }

  // create sentence animation components
  const ballSentence1 = ballLine1.split('').map((char, idx) => (
    <motion.span key={char + '-' + idx} variants={letter}>
      {char}
    </motion.span>
  ))
  const ballSentence2 = ballLine2.split('').map((char, idx) => (
    <motion.span key={char + '-' + idx} variants={letter}>
      {char}
    </motion.span>
  ))

  const triangleSentence1 = triangleLine1.split('').map((char, idx) => (
    <motion.span key={char + '-' + idx} variants={letter}>
      {char}
    </motion.span>
  ))
  const triangleSentence2 = triangleLine2.split('').map((char, idx) => (
    <motion.span key={char + '-' + idx} variants={letter}>
      {char}
    </motion.span>
  ))

  const gravityBallSentence1 = gravityBallLine1.split('').map((char, idx) => (
    <motion.span key={char + '-' + idx} variants={letter}>
      {char}
    </motion.span>
  ))

  const droneHexagonSentence1 = droneHexagonLine1.split('').map((char, idx) => (
    <motion.span key={char + '-' + idx} variants={letter}>
      {char}
    </motion.span>
  ))
  const droneHexagonSentence2 = droneHexagonLine2.split('').map((char, idx) => (
    <motion.span key={char + '-' + idx} variants={letter}>
      {char}
    </motion.span>
  ))

  const oneShotRectangleSentence1 = oneShotRectangleLine1.split('').map((char, idx) => (
    <motion.span key={char + '-' + idx} variants={letter}>
      {char}
    </motion.span>
  ))
  const oneShotRectangleSentence2 = oneShotRectangleLine2.split('').map((char, idx) => (
    <motion.span key={char + '-' + idx} variants={letter}>
      {char}
    </motion.span>
  ))

  return (
    <>
      <InstructionsContainer
        variants={sentence}
        initial='hidden'
        animate={ballInstructionsControl}
      >
        {ballSentence1}
        <br />
        {ballSentence2}
      </InstructionsContainer>

      <InstructionsContainer
        variants={sentence}
        initial='hidden'
        animate={triangleInstructionsControl}
      >
        {triangleSentence1}
        <br />
        {triangleSentence2}
      </InstructionsContainer>

      <InstructionsContainer
        variants={sentence}
        initial='hidden'
        animate={gravityBallInstructionsControl}
      >
        {gravityBallSentence1}
      </InstructionsContainer>

      <InstructionsContainer
        variants={sentence}
        initial='hidden'
        animate={droneHexagonInstructionsControl}
      >
        {droneHexagonSentence1}
        <br />
        {droneHexagonSentence2}
      </InstructionsContainer>

      <InstructionsContainer
        variants={sentence}
        initial='hidden'
        animate={oneShotRectangleInstructionsControl}
      >
        {oneShotRectangleSentence1}
        <br />
        {oneShotRectangleSentence2}
      </InstructionsContainer>
    </>
  )
}

export default Instructions;