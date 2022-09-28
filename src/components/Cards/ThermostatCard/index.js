import React, { useContext, useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import styled from '@emotion/styled';
import { capitalize } from 'lodash';
import CircularSlider from '@fseehawer/react-circular-slider';
import { HassContext } from '@root/context';
import { useResponsive } from '@root/hooks/useResponsive';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const CircularSliderContainer = styled.div`
  position: relative;
  margin-bottom: 40px;
`;

const LabelTitle = styled.div`
  color: #F29F41;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
`;

const LabelTemperature = styled.div`
  font-weight: bold;
  text-align: center;
`;

const LabelContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
`;

const Pickers = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
  > * {
    width: 50%;
  }
`;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const ThermostatContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background-color: rgb(17, 24, 39);
  border-radius: 20px;
  flex-direction: column;
  box-sizing: border-box;
  ${props => props.displaySize === 'desktop' && `
    width: 300px;
    ${LabelTitle} {
      font-size: 14px; 
    }
    ${LabelTemperature} {
      font-size: 40px;
    }
  `}

  ${props => props.displaySize === 'tablet' && `
    width: 280px;
    ${LabelTitle} {
      font-size: 12px; 
    }
    ${LabelTemperature} {
      font-size: 40px;
    }
  `}

  ${props => props.displaySize === 'mobile' && `
    width: 100%;
    ${LabelTitle} {
      font-size: 10px; 
    }
    ${LabelTemperature} {
      font-size: 20px;
    }
  `}
`;

export const ThermostatCard = ({
  className
}) => {
  const entity = 'climate.daikin_ac';
  const hass = useContext(HassContext);
  const ac = hass.states[entity];
  const { current_temperature, fan_mode, fan_modes, hvac_action, hvac_modes, max_temp, min_temp, temperature} = ac.attributes;
  const state = ac.state;
  const [loading, setLoading] = useState(false);
  const [internalFanMode, setInternalFanMode] = useState(fan_mode);
  const [internalState, setInternalState] = useState(state);
  const [internalTemperature, setInternalTemperature] = useState(temperature);
  const displaySize = useResponsive();
  const on = state !== 'off';

  useEffect(() => {
    if (internalFanMode !== fan_mode) {
      hass.callService('climate', 'set_fan_mode', {
        entity_id: entity,
        fan_mode: internalFanMode
      });
    }
    
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [internalFanMode]);

  useEffect(() => {
    if (internalState !== state || internalTemperature !== temperature) {
      hass.callService('climate', 'set_temperature', {
        entity_id: entity,
        hvac_mode: internalState,
        temperature: internalTemperature
      });      
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [internalState, internalTemperature]);

  const action = (() => {
    switch (state) {
      case 'heat_cool':
        return 'HEAT COOLING';
      case 'heat':
        return 'HEATING';
      case 'cool':
        return 'COOLING';
      case 'dry':
        return 'DRY FAN';
      case 'fan_only':
        return 'FAN ONLY';
    }
  })();

  return (
    <ThermostatContainer className={className} displaySize={displaySize}>
      <CircularSliderContainer>
        <CircularSlider
          label="Temperature"
          hideLabelValue={true}
          appendToValue="°"
          min={min_temp}
          max={max_temp}
          width={displaySize === 'desktop' ? 220 : 180}
          knobPosition="bottom"
          knobColor="#005a58"
          progressColorFrom="#75D5E2"
          progressColorTo="#ED6C35"
          progressSize={displaySize === 'desktop' ? 24 : 20}
          trackColor="#eeeeee"
          trackSize={displaySize === 'desktop' ? 24 : 20}
          dataIndex={temperature - min_temp}
          onChange={(t) => {
            setLoading(true);
            setInternalTemperature(t);
          }}
          hideKnob={!on}
        />
        <LabelContainer>
          <LabelTitle>{on ? action : 'CURRENT TEMP'}</LabelTitle>
          <LabelTemperature>{on ? temperature.toFixed(1) : current_temperature.toFixed(1)}°</LabelTemperature>
        </LabelContainer>
      </CircularSliderContainer>
      <Pickers>
        <ThemeProvider theme={darkTheme}>
          <FormControl>
            <InputLabel id="fan_mode">
              Speed
            </InputLabel>
            <Select
              labelId="fan_mode"
              label="Speed"
              value={loading ? internalFanMode : fan_mode}
              onChange={(event) => {
                setLoading(true);
                setInternalFanMode(event.target.value);
              }}
            >
              {fan_modes.map((mode => {
                return <MenuItem key={mode} value={mode}>{capitalize(mode)}</MenuItem>;
              }))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="hvac_modes">
              Mode
            </InputLabel>
            <Select
              labelId="hvac_modes"
              label="Mode"
              value={loading ? internalState : state}
              onChange={(event) => {
                setLoading(true);
                setInternalState(event.target.value);
              }}
            >
              {hvac_modes.map((mode => {
                return <MenuItem key={mode} value={mode}>{capitalize(mode.replace('_', ' '))}</MenuItem>
              }))}
            </Select>
          </FormControl>
        </ThemeProvider>
      </Pickers>
    </ThermostatContainer>
  );
};