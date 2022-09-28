import React, { useContext } from 'react';
import { AccessoryCard } from '@components/Cards';
import { HassContext } from '@root/context';
import { Power, PowerOff } from '@mui/icons-material';


export const SwitchCard = ({
  iconActive,
  iconInactive,
  name,
  entity,
}) => {
  const hass = useContext(HassContext);
  const on = hass.states[entity].state === 'on';
  function onToggle() {
    hass.callService('switch', on ? 'turn_off' : 'turn_on', {
      entity_id: entity,
    });
  }

  return (
    <React.Fragment>
      <AccessoryCard
        iconActive={iconActive ? iconActive : <Power />}
        iconInactive={iconInactive ? iconInactive : <PowerOff />}
        name={name}
        isActive={on}
        handlePress={onToggle}
      />
    </React.Fragment>
  );
};