import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { HassContext } from '@root/context';
import { AreaBase } from '@shared/AreaBase';
import officeBase from './assets/office-base.jpg';
import downlightsBase from './assets/office-downlights.jpg';
import downlightsZone from './assets/office-downlights-zone.png';

import striplightsBase from './assets/office-striplights.jpg';
import striplightsZone from './assets/office-striplight-zone.png';

import roofBase from './assets/office-roof.jpg';
import roofZone from './assets/office-roof-zone.png';

import computerBase from './assets/office-computer.jpg';
import computerZone from './assets/office-computer-zone.png';

const OfficeContainer = styled(AreaBase)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Background = styled.div`
  position: relative;
  width: 80%;
  overflow: hidden;
  img {
    height: auto;
    width: 100%;
  }
`;

const ZoneOverlay = styled.img`
  position: absolute;
  z-index: 2;
  cursor: pointer;
  ${({
    top,
    left,
    width
  }) => {
    return `
      top: ${top || '0'};
      left: ${left || '0'};
      width: ${width || '100%'} !important;
    `;
  }}
`;

const ZoneBase = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  mix-blend-mode: lighten;
  pointer-events: none;
  opacity: 0;
  z-index: 1;
  ${props => props.active && `opacity: 1;`}
`;

function Zone({
  entity,
  base,
  overlay,
}) {
  const active = entity.state === 'on';
  const hass = useContext(HassContext);
  return <>
    <ZoneBase active={active} src={base} />
    <ZoneOverlay onClick={() => {
      hass.callService('switch', 'toggle', {
        entity_id: entity.entity_id,
      });
    }} {...overlay} />
  </>
}

function AreaZones({
  base,
  zones
}) {
  return <Background>
    <img src={base} />
    {zones.map((zone, index) => <Zone {...zone} key={index} />)}
  </Background>
}


export function Office() {
  const hass = useContext(HassContext);
  console.log('hass', hass);
  const zones = [{
    base: downlightsBase,
    overlay:  {
      src: downlightsZone,
      top: '5.2%',
      width: '46.2%',
      left: '53.9%'
    },
    entity: hass.states['switch.office_downlights']
  }, {
    base: striplightsBase,
    overlay:  {
      src: striplightsZone,
      top: '34.2%',
      left: '61.9%',
      width: '38.2%'
    },
    entity: hass.states['switch.office_striplights']
  }, {
    base: roofBase,
    overlay:  {
      src: roofZone,
      top: '0%',
      left: '59%',
      width: '15.2%'
    },
    entity: hass.states['switch.office_roof_light']
  }, {
    base: computerBase,
    overlay:  {
      src: computerZone,
      top: '63%',
      left: '7.5%',
      width: '35.8%'
    },
    entity: hass.states['switch.gaming_pc']
  }];


  return <OfficeContainer>
    <AreaZones base={officeBase} zones={zones} />
  </OfficeContainer>
}