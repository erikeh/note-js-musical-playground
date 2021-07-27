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

type CurrentShape =
  | 'circle'
  | 'triangle'
  | 'gravityCircle'
  | 'droneHexagon'
  | 'oneShotRectangle';

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

  const circleInstructionsPlaying = useAppSelector(
    (state) => state.animationStatus.playingCircleInstructions
  );
  const triangleInstructionsPlaying = useAppSelector(
    (state) => state.animationStatus.playingTriangleInstructions
  );
  const gravityCircleInstructionsPlaying = useAppSelector(
    (state) => state.animationStatus.playingGravityCircleInstructions
  );
  const oneShotRectangleInstructionsPlaying = useAppSelector(
    (state) => state.animationStatus.playingOneShotRectangleInstructions
  );
  const droneHexagonInstructionsPlaying = useAppSelector(
    (state) => state.animationStatus.playingDroneHexagonInstructions
  );

  const areOtherInstructionsPlaying = (currentShape: CurrentShape) => {
    const instructionAnimationStatus = {
      circleInstructionsPlaying,
      triangleInstructionsPlaying,
      gravityCircleInstructionsPlaying,
      oneShotRectangleInstructionsPlaying,
      droneHexagonInstructionsPlaying,
    };
    const otherInstructionsExceptCurrent = Object.entries(
      instructionAnimationStatus
    ).filter((instructionTuple) => {
      return !instructionTuple[0].includes(currentShape);
    });
    return otherInstructionsExceptCurrent.some(
      (otherInstructions) => otherInstructions[1]
    );
  };

  return (
    <div>
      <ButtonContainer>
        <AbsoluteContainer>
          <IconButton
            onClick={handleNewCircleClick}
            disabled={areOtherInstructionsPlaying('circle')}
          >
            <motion.i className="fa fa-music" whileHover={{ scale: 1.1 }} />
          </IconButton>
          <IconButton
            onClick={handleNewRandomTriangleClick}
            disabled={areOtherInstructionsPlaying('triangle')}
          >
            <motion.i
              className="fas fa-exclamation-triangle"
              whileHover={{ scale: 1.1 }}
            />
          </IconButton>
          <IconButton
            onClick={handleNewGravityCircleClick}
            disabled={areOtherInstructionsPlaying('gravityCircle')}
          >
            <motion.i className="fas fa-circle" whileHover={{ scale: 1.1 }} />
          </IconButton>
          <IconButton
            onClick={handleNewDroneHexagonClick}
            disabled={areOtherInstructionsPlaying('droneHexagon')}
          >
            <motion.i className="fas fa-om" whileHover={{ scale: 1.1 }} />
          </IconButton>
          <IconButton
            onClick={handleNewOneShotRectangleClick}
            disabled={areOtherInstructionsPlaying('oneShotRectangle')}
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
