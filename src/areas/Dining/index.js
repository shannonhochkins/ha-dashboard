import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { HassContext } from '@root/context';
import { AreaBase } from '@areas/AreaBase';
import { AreaCard, LightCard, CoverCard, SwitchCard } from '@components/index';
import diningBase from './assets/dining-base-optimised.jpg';
import diningLight from './assets/dining-light-optimised.jpg';

const DiningContainer = styled(AreaBase)`
  display: flex;
  align-items: center;
  justify-content: center;
`;


export function Dining({ direction }) {
  const hass = useContext(HassContext);
  const zones = [{
    base: diningLight,
    overlay:  null,
    entities: {
      switch: 'switch.switch_stairs_bottom_dining_light',
    }
  }];

  return <DiningContainer direction={direction}>
    <AreaCard base={diningBase} zones={zones} footer={
      <>
        <LightCard
          switchEntities={[
            'switch.switch_stairs_bottom_dining_light',
          ]}
          name={'Light'} />

        <CoverCard 
          entity="cover.curtain_pool_window_curtain"
          battery="sensor.curtain_pool_window_battery"
          name={'Curtain Pool'}
        />
        <CoverCard
          entity="cover.curtain_patio_main_curtain"
          battery="sensor.curtain_patio_main_battery"
          name={'Curtain Main'} 
        />
        
      </>
        } />
  </DiningContainer>
}