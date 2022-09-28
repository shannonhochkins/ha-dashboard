import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { HassContext } from '@root/context';
import { AreaBase } from '@areas/AreaBase';
import { Tv } from '@mui/icons-material';
import { AreaCard, LightCard, CoverCard, SwitchCard } from '@components/index';
import livingBase from './assets/living-base.jpg';
import livingLight from './assets/living-light.jpg';
import livingTV from './assets/living-tv.jpg';

const LivingContainer = styled(AreaBase)`
  display: flex;
  align-items: center;
  justify-content: center;
`;


export function Living({ direction }) {
  const hass = useContext(HassContext);
  const zones = [{
    base: livingLight,
    overlay:  null,
    entities: {
      switch: 'switch.switch_back_sliding_door_living_room_light',
    }
  }, {
    base: livingTV,
    overlay:  null,
    entities: {
      switch: 'switch.smartthings_75_sensors',
    }
  }];

  return <LivingContainer direction={direction}>
    <AreaCard base={livingBase} zones={zones} footer={
      <>
        <LightCard
          switchEntities={[
            'switch.switch_back_sliding_door_living_room_light',
          ]}
          name={'Light'} />
        <SwitchCard name={'TV'} iconActive={<Tv />} iconInactive={<Tv />} entity="switch.smartthings_75_sensors" />
        <CoverCard 
          entity="cover.curtain_patio_secondary_curtain"
          battery="sensor.curtain_patio_secondary_battery"
          name={'Curtain Lounge'}
        />
        <CoverCard
          entity="cover.curtain_bbq_window_curtain"
          battery="sensor.curtain_bbq_window_battery"
          name={'Curtain BBQ'} 
        />
        
      </>
        } />
  </LivingContainer>
}