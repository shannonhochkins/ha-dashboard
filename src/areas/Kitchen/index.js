import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { HassContext } from '@root/context';
import { AreaBase } from '@areas/AreaBase';
import { Tv } from '@mui/icons-material';
import { AreaCard, LightCard, CoverCard, SwitchCard } from '@components/index';
import kitchenBase from './assets/kitchen-base.jpg';
import kitchenPantry from './assets/kitchen-pantry.png';
import kitchenRoof from './assets/kitchen-roof.png';
import kitchenSmartframe from './assets/kitchen-smartframe.png';
import kitchenPendants from './assets/kitchen-pendants.png';

const KitchenContainer = styled(AreaBase)`
  display: flex;
  align-items: center;
  justify-content: center;
`;


export function Kitchen({ direction }) {
  const hass = useContext(HassContext);
  // 9pm - 8am
  const now = new Date().getHours();

  const smartFrameOn = now >= 8 && now <= 21;


  const zones = [{
    base: kitchenPantry,
    overlay:  null,
    entities: {
      switch: 'switch.switch_pantry_vertical_garden',
    }
  }, {
    base: kitchenPendants,
    overlay:  null,
    entities: {
      switch: 'switch.switch_kitchen_pendant_light',
    }
  }, {
    base: kitchenRoof,
    overlay:  null,
    entities: {
      switch: 'switch.switch_kitchen_main_light',
    }
  }, {
    base: kitchenSmartframe,
    overlay:  null,
    active: smartFrameOn
  }];

  return <KitchenContainer direction={direction}>
    <AreaCard base={kitchenBase} zones={zones} footer={
      <>
        <LightCard
          switchEntities={[
            'switch.switch_pantry_vertical_garden',
          ]}
          name={'Pantry'} />
        <LightCard
          switchEntities={[
            'switch.switch_kitchen_pendant_light',
          ]}
          name={'Pendants'} />
        <LightCard
          switchEntities={[
            'switch.switch_pantry_main',
          ]}
          name={'Vertical Garden'} />
        <LightCard
          switchEntities={[
            'switch.switch_kitchen_main_light',
          ]}
          name={'Roof'} />
      </>
        } />
  </KitchenContainer>
}