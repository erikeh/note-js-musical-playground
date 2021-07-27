import styled from 'styled-components';
import { Button } from 'react-bulma-components';
import { motion } from 'framer-motion';
import { useAppSelector } from '../app/hooks';

interface ControlsProps {
  handleNewCircleClick: () => void;
  handleNewRandomTriangleClick: () => void;
  handleNewDroneHexagonClick: () => void;
  handleNewGravityCircleClick: () => void;
  handleNewOneShotRectangleClick: () => void;
  handleDeleteAllBodiesClick: () => void;
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const AbsoluteContainer = styled.div`
  position: absolute;
`;
const IconButton = styled(Button)`
  background: none;
  /* color: inherit; */
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 25px;
  padding: 15px 25px 0 25px;
  &:hover {
    cursor: default;
    cursor: ${(props) => (props.disabled ? undefined : 'pointer')};
  }
`;

export default function Controls(props: ControlsProps) {
  const {
    handleNewCircleClick,
    handleNewRandomTriangleClick,
    handleNewDroneHexagonClick,
    handleNewGravityCircleClick,
    handleNewOneShotRectangleClick,
    handleDeleteAllBodiesClick,
  } = props;

  const ballInstructionsPlaying = useAppSelector(
    (state) => state.playedInstructions.playingBallInstructions
  );
  const triangleInstructionsPlaying = useAppSelector(
    (state) => state.playedInstructions.playingTriangleInstructions
  );
  const gravityCircleInstructionsPlaying = useAppSelector(
    (state) => state.playedInstructions.playingGravityCircleInstructions
  );

  const otherInstructionsPlaying = (currentShape: string) => {
    const instructions = {
      ballInstructionsPlaying,
      triangleInstructionsPlaying,
      gravityCircleInstructionsPlaying,
    };
    return Object.entries(instructions)
      .filter((instructionTuple) => {
        return !instructionTuple[0].includes(currentShape);
      })
      .some((otherInstructions) => otherInstructions[1] === true);
  };

  return (
    <div>
      <ButtonContainer>
        <AbsoluteContainer>
          <IconButton onClick={handleNewCircleClick}>
            <motion.i className="fa fa-music" whileHover={{ scale: 1.1 }} />
          </IconButton>
          <IconButton
            onClick={handleNewRandomTriangleClick}
            disabled={otherInstructionsPlaying('triangle')}
          >
            <motion.i
              className="fas fa-exclamation-triangle"
              whileHover={{ scale: 1.1 }}
            />
          </IconButton>
          <IconButton
            onClick={handleNewGravityCircleClick}
            disabled={otherInstructionsPlaying('gravityCircle')}
          >
            <motion.i className="fas fa-circle" whileHover={{ scale: 1.1 }} />
          </IconButton>
          <IconButton
            onClick={handleNewDroneHexagonClick}
            disabled={otherInstructionsPlaying('droneHexagon')}
          >
            <motion.i className="fas fa-om" whileHover={{ scale: 1.1 }} />
          </IconButton>
          <IconButton
            onClick={handleNewOneShotRectangleClick}
            disabled={otherInstructionsPlaying('oneShotRectangle')}
          >
            <motion.i className="fas fa-bahai" whileHover={{ scale: 1.1 }} />
          </IconButton>
          <IconButton onClick={handleDeleteAllBodiesClick}>
            <motion.i className="far fa-trash-alt" whileHover={{ scale: 1.1 }} />
          </IconButton>
        </AbsoluteContainer>
      </ButtonContainer>
    </div>
  );
}
