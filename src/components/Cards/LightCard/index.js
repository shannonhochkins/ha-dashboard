import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { AccessoryCard } from '@components/Cards';
import { HassContext } from '@root/context';
import { useModalHelper } from '@root/hooks/useModalHelper';
import { LightCardModal } from './modal';
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

  /**
   * @function onButtonToggle
   * @description When the button is toggled it will turn off all the light switches if the current mode is
   * switch mode, else will turn off all the lights
   */
  function onButtonToggle() {
    hass.callService(mode, on ? 'turn_off' : 'turn_on', {
      entity_id: mode === 'switch' ? switchEntities : lightAndSwitchEntities.map(({ light }) => light),
    });
  }

  return (
    <React.Fragment>
      <StyledAccessoryCard
        iconActive={iconActive ? iconActive : <Lightbulb />}
        iconInactive={iconInactive ? iconInactive : <Lightbulb />}
        name={name}
        isActive={on}
        handlePress={onButtonToggle}
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