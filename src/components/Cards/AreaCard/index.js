import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { HassContext } from '@root/context';
import { useResponsive } from '@root/hooks/useResponsive';



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
  transition: opacity 0.3s ease;
  opacity: ${props => props.opacity};
`;

const ZoneFooter = styled.div`
  width: calc( 100% - 40px);
  padding: 30px 20px;
  background-color: rgba(15, 21, 35, 0.8);
  display: flex;
  align-items: space-evenly;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;

const Zones = styled.div`
  position: relative;
`;

const Background = styled.div`
  position: relative;
  width: 90%;
  overflow: hidden;
  border-radius: 30px;
  img {
    height: auto;
    width: 100%;
  }
  ${props => props.displaySize === 'desktop' && `
    ${ZoneFooter} {
      position: absolute;
      bottom:0;
      left:0;
      z-index: 9;
      width: calc( 100% - 20px);
      padding: 10px;
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly;
      gap: 0px;
    }`
  }
`;

function Zone({
  entities,
  base,
  overlay = null,
  active = false
}) {
  let brightness = 0;
  const hass = useContext(HassContext);
  if (entities) {
      const light = hass.states[entities.light] ? hass.states[entities.light] : null;
      const $switch = hass.states[entities.switch];
      brightness = light && light.state !== 'unavailable' ? light.state === 'on' ? (light.attributes.brightness / 255) : 0 : $switch.state === 'on' ? 1 : 0;
  } else if (active) {
    brightness = 1;
  }
  
  return <>
    <ZoneBase opacity={brightness} src={base} />
    {overlay !== null && <ZoneOverlay onClick={() => {
      hass.callService('switch', 'toggle', {
        entity_id: entities.switch,
      });
    }} {...overlay} />}
  </>
}

export function AreaCard({
  base,
  zones,
  footer
}) {
  const displaySize = useResponsive();
  return <Background displaySize={displaySize}>
    <Zones>
      <img src={base} />
      {zones.map((zone, index) => <Zone {...zone} key={index} />)}
    </Zones>
    {footer && <ZoneFooter>
      {footer}
    </ZoneFooter>}
  </Background>
}