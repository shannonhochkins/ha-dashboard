import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { AccessoryCard } from '@components/Cards';
import { HassContext } from '@root/context';
import { useModalHelper } from '@root/hooks/useModalHelper';
import { LightCardModal } from './modal';
import tinycolor from 'tinycolor2';
import { Lightbulb } from '@mui/icons-material';

const StyledAccessoryCard = styled(AccessoryCard)`  
  [class*="AccessoryCardIcon"] {
    svg {
      ${props => props.lightColor ? `color: #${props.lightColor};` : ''}
    }
  }
`;


export const LightCard = ({
  iconActive,
  iconInactive,
  name,
  switchEntities = [],
  lightAndSwitchEntities = [],
  mode = 'switch'
}) => {
  const hass = useContext(HassContext);
  const { showModal, openModal, closeModal } = useModalHelper();
  const on = mode === 'switch' ? switchEntities.some($entity => {
    return hass.states[$entity].state === 'on';
  }) : lightAndSwitchEntities.some(({ light }) => hass.states[light].state === 'on');
  function onToggle() {
    hass.callService(mode, on ? 'turn_off' : 'turn_on', {
      entity_id: mode === 'switch' ? switchEntities : lightAndSwitchEntities.map(({ light }) => light),
    });
  }
  const lights = lightAndSwitchEntities.map(({ light }) => hass.states[light]).filter(x => !!x);
  // get the mixed colour of all entities seing as we'll have one wheel for all entities
  const hex = !!lights.length ? tinycolor.mix(...lights.map(light => ({
    r: light.state === 'on' ? light.attributes.rgb_color[0] : 0,
    g: light.state === 'on' ? light.attributes.rgb_color[1] : 0,
    b: light.state === 'on' ? light.attributes.rgb_color[2] : 0,
  })), 50).toHex() : null;

  return (
    <React.Fragment>
      <StyledAccessoryCard
        lightColor={hex}
        iconActive={iconActive ? iconActive : <Lightbulb />}
        iconInactive={iconInactive ? iconInactive : <Lightbulb />}
        name={name}
        isActive={on}
        handlePress={onToggle}
        handleLongPress={openModal}
      />
      {!!lightAndSwitchEntities.length && <LightCardModal
        name={name}
        lightAndSwitchEntities={lightAndSwitchEntities}
        show={showModal}
        close={closeModal} />}
    </React.Fragment>
  );
};