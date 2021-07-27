import MatterMaker from './MatterMaker';
import Instructions from './Instructions';
import Icons from './Controls';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <CenteredDiv>
      <Instructions />
      <MatterMaker />
    </CenteredDiv>
  );
}

export default App;
