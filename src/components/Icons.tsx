import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface IconsProps {
  handleNewCircleClick: () => void,
  handleNewRandomTriangleClick: () => void,
  handleNewDroneHexagonClick: () => void,
  handleNewGravityCircleClick: () => void,
  handleNewOneShotRectangleClick: () => void,
  handleDeleteAllBodiesClick: () => void,
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`
const AbsoluteContainer = styled.div`
  position: absolute;
`
const IconButton = styled.button`
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
    cursor: pointer;
  }
`

export default function Icons(props: IconsProps) {
  const {
    handleNewCircleClick,
    handleNewRandomTriangleClick,
    handleNewDroneHexagonClick,
    handleNewGravityCircleClick,
    handleNewOneShotRectangleClick,
    handleDeleteAllBodiesClick,
  } = props;

  return (
    <div>
      <ButtonContainer>
        <AbsoluteContainer>
          <IconButton onClick={handleNewCircleClick}>
            <motion.i
              className="fa fa-music"
              whileHover={{ scale: 1.1 }}
            />
          </IconButton>
          <IconButton onClick={handleNewRandomTriangleClick}>
            <motion.i
              className="fas fa-exclamation-triangle"
              whileHover={{ scale: 1.1 }}
            />
          </IconButton>
          <IconButton onClick={handleNewGravityCircleClick}>
            <motion.i
              className="fas fa-circle"
              whileHover={{ scale: 1.1 }}
            />
          </IconButton>
          <IconButton onClick={handleNewDroneHexagonClick}>
            <motion.i
              className="fas fa-om"
              whileHover={{ scale: 1.1 }}
            />
          </IconButton>
          <IconButton onClick={handleNewOneShotRectangleClick}>
            <motion.i
              className="fas fa-bahai"
              whileHover={{ scale: 1.1 }}
            />
          </IconButton>
          <IconButton onClick={handleDeleteAllBodiesClick}>
            <motion.i
              className="far fa-trash-alt"
              whileHover={{ scale: 1.1 }}
            />
          </IconButton>
        </AbsoluteContainer>
      </ButtonContainer>
    </div>
  )
}
