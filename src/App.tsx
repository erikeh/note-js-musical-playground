import React from 'react';
import MatterMaker from './components/MatterMaker';
import Test from './components/test';
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
      {/* <Test /> */}
    </CenteredDiv>
  );
}

export default App;
