import MatterMaker from './MatterMaker';
import Instructions from './Instructions';
import styled from 'styled-components';

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
