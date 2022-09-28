import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { HassContext } from '@root/context';
import Modal from 'react-modal';


Modal.setAppElement('html');

const LowBatteries = styled.div`
  width: 100%;
  padding: 4px 10px;
  display: flex;
  div {
    font-size: 11px;
    margin-right: 20px;
    position: relative;
    &:after {
      content: '';
      width: 10px;
      height: 10px;
      position: absolute;
      top: 50%;
      margin-top: -5px;
      right: -10px;
      border-right: 1px solid rgb(45, 55, 72);
    }
    &:last-of-type {
      &:after {
        display: none;
      }
    }
  }
`;

export function BatteryWarnings() {  
  const hass = useContext(HassContext);
  const batteryEntities = Object.keys(hass.states)
    .filter(e => e.includes('battery'))
    .map(e => hass.states[e])
    .filter(b => !isNaN(Number(b.state)))
    .map(b => ({
      ...b,
      state: Number(b.state)
    }))
    .filter(x => !x.entity_id.includes('phone'))
    .filter(b => b.state <= 5 && b.state >= 0);
  return batteryEntities.length ? <LowBatteries>
    {batteryEntities.map(battery => <div key={battery.entity_id}>
      {battery.attributes.friendly_name} - {battery.state}%
    </div>)}
  </LowBatteries> : null;
}

