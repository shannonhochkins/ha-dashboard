import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { HassContext } from '@root/context';
import { AreaBase } from '@areas/AreaBase';
import { useResponsive } from '@root/hooks/useResponsive';
import { CameraCard, ThermostatCard } from '@components/index';

const StyledCameraCard = styled(CameraCard)``;

const CameraSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 50%;
  justify-content: space-between;

  ${StyledCameraCard} {
    width: calc(50% - 10px);
    margin:10px 0;
  }
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledThermostatCard = styled(ThermostatCard)``;

const HomeContainer = styled(AreaBase)`
  display: flex;
  align-items: center;
  justify-content: center;
  ${props => props.displaySize === 'desktop' && `
    ${StyledThermostatCard} {
      margin-right: 20px;
    }
    ${Inner} {
      flex-direction: row;
    }
    ${CameraSection} {
      width: 50%;
    }
  `}
  ${props => props.displaySize !== 'desktop' && `
    ${CameraSection} {
      margin-top: 10px;
      width: 100%;
    }
  `}
`;

export function Home({ direction }) {
  const hass = useContext(HassContext);
  const displaySize = useResponsive();

  const cameras = [
    'camera.aarlo_double_gate',
    'camera.aarlo_driveway_main',
    'camera.aarlo_front_door',
    'camera.aarlo_side_gate',
  ];

  return <HomeContainer direction={direction} displaySize={displaySize}>
    <Inner>
      <StyledThermostatCard />
      <CameraSection>
        {cameras.map(cam => <StyledCameraCard entity={cam} key={cam} />)}
      </CameraSection>
    </Inner>
  </HomeContainer>
}