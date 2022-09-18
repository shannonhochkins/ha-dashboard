import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { HassContext } from '@root/context';
import { AreaBase } from '@shared/AreaBase';

const HomeContainer = styled(AreaBase)`
  
`;



export function Home() {
  const hass = useContext(HassContext);


  return <HomeContainer>
    Home
  </HomeContainer>
}