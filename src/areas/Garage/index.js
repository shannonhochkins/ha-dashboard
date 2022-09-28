import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { HassContext } from '@root/context';
import { AreaBase } from '@areas/AreaBase';
import { AreaCard, LightCard, CoverCard, SwitchCard } from '@components/index';
import base from './assets/garage-base.jpg';
import downlights from './assets/garage-lights.jpg';

const GarageContainer = styled(AreaBase)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function Garage({ direction }) {
  const hass = useContext(HassContext);
  const zones = [{
    base: downlights,
    overlay:  null,
    entities: {
      switch: 'switch.switch_light_garage_main',
    }
  }];
  return <GarageContainer direction={direction}>
    <AreaCard base={base} zones={zones} footer={
      <>
        <LightCard
          switchEntities={[
            'switch.switch_light_garage_main',
          ]}
          name={'Downlights'} />
      </>
        } />
  </GarageContainer>
}