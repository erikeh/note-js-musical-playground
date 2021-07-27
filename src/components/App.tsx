import MatterMaker from './MatterMaker';
import Instructions from './Instructions';
import Icons from './Icons';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
`

const InstructionsContainer = styled(motion.h3)`
  position: absolute;
  top: 100px;
`


function App() {
  const ballInstructionsControl = useAnimation();
  const triangleInstructionsControl = useAnimation();
  const gravityBallInstructionsControl = useAnimation();
  const droneHexagonInstructionsControl = useAnimation();
  const oneShotRectangleInstructionsControl = useAnimation();

  async function handleBallAnimationStart() {
    await ballInstructionsControl.start('visible')
    await new Promise(r => setTimeout(r, 2000))
    await ballInstructionsControl.start('hidden')
  }
  async function handleTriangleAnimationStart() {
    await triangleInstructionsControl.start('visible')
    await new Promise(r => setTimeout(r, 2000))
    await triangleInstructionsControl.start('hidden')
  }
  async function handleGravityBallAnimationStart() {
    await gravityBallInstructionsControl.start('visible')
    await new Promise(r => setTimeout(r, 2000))
    await gravityBallInstructionsControl.start('hidden')
  }
  async function handleDroneHexagonAnimationStart() {
    await droneHexagonInstructionsControl.start('visible')
    await new Promise(r => setTimeout(r, 2000))
    await droneHexagonInstructionsControl.start('hidden')
  }
  async function handleOneShotRectangleAnimationStart() {
    await oneShotRectangleInstructionsControl.start('visible')
    await new Promise(r => setTimeout(r, 2000))
    await oneShotRectangleInstructionsControl.start('hidden')
  }

  return (
    <CenteredDiv>
      <Instructions
        handleBallAnimationStart={handleBallAnimationStart}
        handleTriangleAnimationStart={handleTriangleAnimationStart}
        handleGravityBallAnimationStart={handleGravityBallAnimationStart}
        handleDroneHexagonAnimationStart={handleDroneHexagonAnimationStart}
        handleOneShotRectangleAnimationStart={handleOneShotRectangleAnimationStart}
      />

      <MatterMaker
        handleBallAnimationStart={handleBallAnimationStart}
        handleTriangleAnimationStart={handleTriangleAnimationStart}
        handleGravityBallAnimationStart={handleGravityBallAnimationStart}
        handleDroneHexagonAnimationStart={handleDroneHexagonAnimationStart}
        handleOneShotRectangleAnimationStart={handleOneShotRectangleAnimationStart}
      />
    </CenteredDiv>
  );
}

export default App;
