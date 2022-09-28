import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { HassContext } from '@root/context';
import { Battery50 } from '@mui/icons-material';
import { CardContainer, CardTitle } from '@components/Cards';
import { useLoadImage } from '@root/hooks/useLoadImage';
import { LoadingPlaceholder } from './CameraCardPlaceholderLoading';
import { OfflinePlaceholder } from './CameraCardPlaceholderOffline';


const CameraCardContainer = styled(CardContainer)`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 396px;
  height: 240px;
  background: black;
`;

const CameraCardContent = styled.div`
  flex-grow: 1;
`;

const CameraImage = styled.img`
  width: 100%;
`;

export const CameraCard = (props) => {
  const hass = useContext(HassContext);
  const camera = hass.states[props.entity];
  const isAvailable = camera && camera.state !== 'unavailable' && !!camera.attributes;

  const { last_thumbnail = null, battery_level, friendly_name = 'unknown' } = camera.attributes || {};
  const { isLoading, isLoaded, } = useLoadImage(last_thumbnail);
  
  return (
    <CameraCardContainer className={props.className}>
      <CardTitle>{friendly_name} <Battery50 />{battery_level}%</CardTitle>
      <CameraCardContent>
        {!isAvailable ? <OfflinePlaceholder entity={props.entity} /> : isLoading ?
          <LoadingPlaceholder /> :
          (isLoaded ?
            <CameraImage src={last_thumbnail} /> :
            <OfflinePlaceholder entity={props.entity} />
          )
        }
      </CameraCardContent>
    </CameraCardContainer>
  );
};
