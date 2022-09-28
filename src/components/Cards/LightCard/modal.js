import React, { useState, useContext, useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import { debounce } from 'lodash';
import styled from '@emotion/styled';
import { HassContext } from '@root/context';
import { Lightbulb, Thermostat, BrightnessLow } from '@mui/icons-material';
import { ModalContainer, ModalContent, ModalHeader, ModalStyle } from '@components/Modals';
import Wheel from '@uiw/react-color-wheel';
import tinycolor from 'tinycolor2';
import { TabContext, TabList, TabPanel} from '@mui/lab';
import { Tab, Stack, Slider } from '@mui/material';
import { FieldWrapper, FieldTitle } from '@components/Form';

Modal.setAppElement('html');

const StyledTabPanel = styled(TabPanel)`
  width: 100%;
  padding: 12px;
  background-color: rgba(255,255,255,0.05);
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
`;

const StyledTab = styled(Tab)`
  width: 50%;
  color: #8e8e8e;
  background-color: rgba(255,255,255,0.03);
  &.Mui-selected {
    color: #f1f1f1;
    background-color: rgba(255,255,255,0.08);
  }
`;

const StyledTabContext = styled(TabContext)`
  
`
const StyledTabList = styled(TabList)`
  width: 100%;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
`;

const StyledStack = styled(Stack)`
  width: 100%;
  color: #111;
`;

const StyledFieldWrapper = styled(FieldWrapper)`
  background-image: -webkit-linear-gradient( right, rgb(255, 160, 0) 0%, white 50%, rgb(166, 209, 255) 100% );
`;

const StyledSlider = styled(Slider)`
  margin-right: 24px !important;
`;
const StyledBrightnessLow = styled(BrightnessLow)`
  color: #f1f1f1;
`;

const StyledWheel = styled(Wheel)``;
export const LightCardModal = ({
  lightAndSwitchEntities = [],
  show,
  close,
  name
}) => {
  // extract hass context
  const hass = useContext(HassContext);
  // convert the input into something more useable  
  const entities = lightAndSwitchEntities.map(({ switch: $switch, light }) => ({
    light: hass.states[light],
    $switch: hass.states[$switch],
  }));
  // grab the first light from the list
  const firstLight = entities[0].light.attributes;
  // if any are in temp mode, use temp mode
  const isTemperatureMode = firstLight.color_mode === 'color_temp';
  // check if the first light in the group is in color or temp mode
  // we assume if all lights are passed in we'd expect them to all be in the same mode
  const defaultTabValue = isTemperatureMode ? 'temp' : 'color';
  // get the default color temp
  const defaultColorTemp = isTemperatureMode ? firstLight.color_temp : 153;

  // get the mixed colour of all entities seing as we'll have one wheel for all entities
  const defaultHex = tinycolor.mix(...entities.map(x => ({
    r: x.light.state === 'on' ? x.light.attributes.rgb_color[0] : 0,
    g: x.light.state === 'on' ? x.light.attributes.rgb_color[1] : 0,
    b: x.light.state === 'on' ? x.light.attributes.rgb_color[2] : 0,
  })), 50).toHex();


  const [hex, setHex] = useState(defaultHex);
  const [colorTemp, setColorTemp] = useState(defaultColorTemp);
  const [brightness, setBrightness] = useState(firstLight.brightness || 255);
  const [tabValue, setTabValue] = React.useState(defaultTabValue);
  const hassApplyColorUpdate = useCallback(debounce(hassApplyColorChange, 500), []);
  const hassApplyTempUpdate = useCallback(debounce(hassApplyTempChange, 500), []);
  const hassApplyBrightnessUpdate = useCallback(debounce(hassApplyBrightnessChange, 500), []);

  useEffect(() => {
    if (defaultTabValue !== tabValue) {
      setTabValue(defaultTabValue);
    }
  }, [defaultTabValue]);

  /**
   * @function turnOnLightSwitch
   * @description - Helper to turn on the light switch and ensure it's only called if the light switch is actually off
   * @param {*} color - color value from the slider
   * @returns {void} no return value
   */
  function turnOnLightSwitch($switch) {
    if ($switch && $switch.state === 'off') {
      hass.callService('switch', 'turn_on', {
        entity_id: $switch.entity_id
      });
    }
  }
  /**
   * @function hassApplyColorChange
   * @description - This is called automatically by the debounce callback, should not be triggered manually
   * as we don't want to bombard hass with updates
   * @param {*} color - color value from the slider
   * @returns {void} no return value
   */
  function hassApplyColorChange(color) {
    const rgb = [
      color.rgb.r,
      color.rgb.g,
      color.rgb.b
    ];
    entities.forEach(({ light, $switch }) => {
      turnOnLightSwitch($switch);
      hass.callService('light', 'turn_on', {
        entity_id: light.entity_id,
        rgb_color: rgb
      });
    }); 
  }
  /**
   * @function hassApplyTempChange
   * @description - This is called automatically by the debounce callback, should not be triggered manually
   * as we don't want to bombard hass with updates
   * @param {*} color_temp - new color_temp value
   * @returns {void} no return value
   */
  function hassApplyTempChange(color_temp) {
    entities.forEach(({ light, $switch }) => {
      turnOnLightSwitch($switch);
      hass.callService('light', 'turn_on', {
        entity_id: light.entity_id,
        color_temp
      });
    });
  }

  /**
   * @function hassApplyBrightnessChange
   * @description - This is called automatically by the debounce callback, should not be triggered manually
   * as we don't want to bombard hass with updates
   * @param {*} brightness - new brightness value
   * @returns {void} no return value
   */
  function hassApplyBrightnessChange(brightness) {
    entities.forEach(({ light, $switch }) => {
      turnOnLightSwitch($switch);
      hass.callService('light', 'turn_on', {
        entity_id: light.entity_id,
        brightness
      });
    });
  }

  /**
   * @function handleColorChange
   * @description - internal change event to maintain the state of the interface
   * This will called a debounced method which will apply the update after X time has passed
   * and the state value hasn't changed for that time.
   * @param {*} color - the actual value from the color wheel
   * @returns {void} no return value
   */
  function handleColorChange(color) {
    setHex(color.hex);
    hassApplyColorUpdate(color);
  }

  /**
   * @function handleTempChange
   * @description - internal change event to maintain the state of the interface
   * This will called a debounced method which will apply the update after X time has passed
   * and the state value hasn't changed for that time.
   * @param {*} event - event from the slider
   * @param {*} newValue - the actual value from the slider
   * @returns {void} no return value
   */
  function handleTempChange(event, newValue) {
    setColorTemp(newValue);
    hassApplyTempUpdate(newValue);
  }

  /**
   * @function handleBrightnessChange
   * @description - internal change event to maintain the state of the interface
   * This will called a debounced method which will apply the update after X time has passed
   * and the state value hasn't changed for that time.
   * @param {*} event - event from the slider
   * @param {*} newValue - the actual value from the slider
   * @returns {void} no return value
   */
  function handleBrightnessChange(event, newValue) {
    setBrightness(newValue);
    hassApplyBrightnessUpdate(newValue);
  }

  return (
    <Modal
      isOpen={show}
      onRequestClose={close}
      contentLabel="Light Properties"
      style={ModalStyle}
    >
      <ModalContainer>
        <ModalHeader
          title={name}
          subtitle={entities.map(({ light }) => light.attributes.friendly_name).join(', ')}
          close={close}
          icon={
            <Lightbulb />
          }
        />
        <ModalContent>
          <FieldWrapper>
            <FieldTitle>Light Properties</FieldTitle>
            <FieldWrapper>
              <FieldTitle>Brightness</FieldTitle>
              <StyledStack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <StyledBrightnessLow />
                <StyledSlider min={1} max={255} value={brightness} onChange={handleBrightnessChange} />
              </StyledStack>
            </FieldWrapper>
            <StyledTabContext value={tabValue}>
              <StyledTabList onChange={(event, newValue) => {
                setTabValue(newValue)
              }}>
                <StyledTab label="Colour" value={'color'} />
                <StyledTab label="Temperature" value={'temp'} />
              </StyledTabList>
              <StyledTabPanel value={'color'}>
                <FieldWrapper>
                  <FieldTitle>COLOUR</FieldTitle>
                  <StyledWheel
                    color={hex}
                    onChange={(color) => {
                      handleColorChange(color);
                    }}
                  />
                </FieldWrapper>
              </StyledTabPanel>
              <StyledTabPanel value={'temp'}>
                <StyledFieldWrapper>
                  <FieldTitle>Temperature</FieldTitle>
                  <StyledStack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                    <Thermostat />
                    <StyledSlider min={153} max={370} value={colorTemp} onChange={handleTempChange} />
                  </StyledStack>
                </StyledFieldWrapper>
              </StyledTabPanel>
            </StyledTabContext>
          </FieldWrapper>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};