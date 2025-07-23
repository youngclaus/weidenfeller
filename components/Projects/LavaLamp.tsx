import React from 'react';
import styled, { keyframes } from 'styled-components';

const move = keyframes`
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(400px, 150px);
  }
  50% {
    transform: translate(200px, 300px);
  }
  75% {
    transform: translate(0, 150px);
  }
  100% {
    transform: translate(0, 0);
  }
`;

const LavaLampContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  filter: url(#lava-filter);
`;

const Blob = styled.div`
  position: absolute;
  border-radius: 50%;
  box-shadow: 0 0 20px 0px ${({theme}) => theme.c3};
  animation: ${move} 20s infinite;

  &:nth-child(1) {
    width: 300px;
    height: 300px;
    top: 50px;
    left: 50px;
    animation-duration: 15s;
    background-color: ${({ theme }) => theme.c3};
  }

  &:nth-child(2) {
    width: 200px;
    height: 200px;
    top: 200px;
    left: 250px;
    animation-duration: 25s;
    animation-direction: alternate;
    background-color: ${({ theme }) => theme.c3};
  }

  &:nth-child(3) {
    width: 150px;
    height: 150px;
    top: 400px;
    left: 100px;
    animation-duration: 20s;
    background-color: ${({ theme }) => theme.c3};
  }
`;

const LavaLamp = () => {
  return (
    <>
      <LavaLampContainer>
        <Blob />
        <Blob />
        <Blob />
      </LavaLampContainer>
      <svg>
        <defs>
          <filter id="lava-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="lava" />
            <feBlend in="SourceGraphic" in2="lava" />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default LavaLamp; 