import React, { useContext } from 'react';
import { HassContext } from '@root/context';
import styled from '@emotion/styled';
import { createRipples } from 'react-ripples';
import { Battery20 } from '@mui/icons-material';

import { Button } from '@components/Form';

const ActionRipple = createRipples({
  during: 900,
});

export const CardContainer = styled(ActionRipple)`
  border-radius: 12px;
  box-sizing: border-box;
  overflow: hidden;
  user-select: none;
`;

export const ActionableCardContainer = styled(CardContainer)`
  background-color: ${props => props.isActive ? '#f1f1f1' : '#f1f1f1'};
  opacity: ${props => props.isActive ? '1' : (props.isActive === false ? '0.7' : '1')};
  cursor: pointer;
`;

export const CardName = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: ${props => props.isActive ? '#000000D0' : '#000000D0'};
`;

export const CardIcon = styled.div`
  filter: ${props => props.isActive ? 'grayscale(0%)' : 'grayscale(100%)'} ;
  svg {
    height: 20px;
    max-height: 20px;
  }
`;

export const CardTitle = styled.div`
  width: 100%;
  height: 30px;
  line-height: 30px;
  background-color: #0d121e;
  color: #000000D0;
  padding-left: 10px;
  box-sizing: border-box;
  font-size: 12px;
  font-weight: bold;
`;

export const AccessoryCardContainer = styled(Button)`
  justify-content: flex-start;
`;

export const AccessoryCardName = styled(CardName)`
  justify-self: start;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #606060;
  font-size: 12px;
  margin-right: 8px;
`;


export const AccessoryCardIcon = styled(CardIcon)`
  justify-self: start;
  width: 1.8rem;
  svg {
    color: #ffaa36;
  }
`;

let buttonPressTimer;


export const AccessoryCard = (props) => {
  const hass = useContext(HassContext);
  const battery = hass.states[props.battery];


  function handlePress() {
    if (props.handlePress) {
      props.handlePress();
    }
  }

  function handleButtonPress () {
    if (props.handleLongPress) {
      buttonPressTimer = setTimeout(() => props.handleLongPress && props.handleLongPress(), 1000);
    }
  }

  function handleButtonRelease () {
    clearTimeout(buttonPressTimer);
  }

  const icon = props.isActive ? props.iconActive : props.iconInactive;

  return (
    <AccessoryCardContainer
      className={props.className}
      active={props.isActive}
      startIcon={icon}
      endIcon={battery && battery.state && Number(battery.state) <= 20 ? <Battery20 /> : null}
      onClick={handlePress}
      onTouchStart={handleButtonPress}
      onTouchEnd={handleButtonRelease}
      onMouseDown={handleButtonPress}
      onMouseUp={handleButtonRelease}
      onMouseLeave={handleButtonRelease}
    >
      {props.name}
    </AccessoryCardContainer>
  );
};