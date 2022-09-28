import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { HassContext } from '@root/context';
import { AreaBase } from '@areas/AreaBase';
import { AreaCard, LightCard, CoverCard, SwitchCard } from '@components/index';
import { Tv } from '@mui/icons-material'
import base from './assets/bedroom-base.jpg';
import tv from './assets/bedroom-tv.jpg';
import roofLight from './assets/bedroom-light-roof.jpg';

const MasterBedroomContainer = styled(AreaBase)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function MasterBedroom({ direction }) {
  const hass = useContext(HassContext);
  const zones = [{
    base: roofLight,
    overlay:  null,
    entities: {
      switch: 'switch.switch_master_bedroom_light',
    }
  }, {
    base: tv,
    overlay:  null,
    entities: {
      switch: 'switch.tv_master_bedroom',
    }
  }];
  
  return <MasterBedroomContainer direction={direction}>
    <AreaCard base={base} zones={zones} footer={
      <>
        <LightCard
          switchEntities={[
            'switch.switch_master_bedroom_light',
          ]}
          name={'Fan Light'} />
        <LightCard
          mode="light"
          lightAndSwitchEntities={[
            {
              light: 'light.master_striplight_under_bed',
            }
          ]}
          name={'Bed Light'} />
        <SwitchCard name={'TV'} iconActive={<Tv />} iconInactive={<Tv />} entity="switch.tv_master_bedroom" />
        <CoverCard 
          entity="cover.curtain_master_curtain"
          name={'Curtain'}
        />
        <CoverCard
          entity="cover.roller_blind_master_primary"
          name={'Blind Main'} 
        />
        <CoverCard
          entity="cover.roller_blind_master_secondary"
          name={'Blind Small'} 
        />
      </>
        } />
  </MasterBedroomContainer>
}