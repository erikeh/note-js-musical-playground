import React from 'react';
import MatterMaker from './components/MatterMaker';
import styled from 'styled-components';
import './App.css';

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
`

function App() {
  return (
    <CenteredDiv>
      <MatterMaker/>
    </CenteredDiv>
  );
}

export default App;
