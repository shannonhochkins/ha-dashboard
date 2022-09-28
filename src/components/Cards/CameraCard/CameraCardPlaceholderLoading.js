import React from 'react';
import styled from '@emotion/styled';

import SpinnerAnimatedIcon from './spinner-animated.svg';

export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: gray;
  font-weight: bold;
  background: black;
`;

export const IconContainer = styled.div`
  width: 40px;
`;

export const TextContainer = styled.div`
  font-size: 12px;
`;

export const LoadingPlaceholder = () => {
  return (
    <EmptyContainer>
      <IconContainer>
        <img src={SpinnerAnimatedIcon} />
      </IconContainer>
    </EmptyContainer>
  );
};
