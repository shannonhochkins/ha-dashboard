import React, { FC, useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import styled from '@emotion/styled';
import { HassContext } from '@root/context';
import { Lightbulb, Thermostat, BrightnessLow } from '@mui/icons-material';
import { ModalContainer, ModalContent, ModalHeader, ModalStyle } from '@components/Modals';
import Wheel from '@uiw/react-color-wheel';
import tinycolor from 'tinycolor2';
import { TabContext, TabList, TabPanel} from '@mui/lab';
import { Tab, Stack, Slider } from '@mui/material';
import { FieldWrapper, FieldTitle, FieldInner } from '@components/Form';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('html');

const StyledTabPanel = styled(TabPanel)`
  width: 100%;
  padding: 12px;
  background-color: rgba(255,255,255,0.1);
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
`;

const StyledTab = styled(Tab)`
  width: 50%;
  color: #8e8e8e;
  background-color: rgba(255,255,255,0.05);
  &.Mui-selected {
    color: #f1f1f1;
    background-color: rgba(255,255,255,0.1);
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

const StyledWheel = styled(Wheel)`

`;
let timeout;
export const LightCardModal = ({
  lightAndSwitchEntities = [],
  show,
  close,
  name
}) => {
  const hass = useContext(HassContext);
  
  const entities = lightAndSwitchEntities.map(({ switch: $switch, light }) => ({
    light: hass.states[light],
    $switch: hass.states[$switch],
  }));
  const firstLight = entities[0].light.attributes;
  // if any are in temp mode, use temp mode
  const isTemperatureMode = firstLight.color_mode === 'color_temp';
  const defaultTabValue = isTemperatureMode ? 'temp' : 'color';
  const [tabValue, setTabValue] = React.useState(defaultTabValue);
  const [loading, setLoading] = useState(false);

  const defaultColorTemp = isTemperatureMode ? firstLight.color_temp : 153;
  const [colorTemp, setColorTemp] = useState(defaultColorTemp);
  const [brightness, setBrightness] = useState(firstLight.brightness || 255);

  // get the mixed colour of all entities seing as we'll have one wheel for all entities
  const hex = tinycolor.mix(...entities.map(x => ({
    r: x.light.state === 'on' ? x.light.attributes.rgb_color[0] : 0,
    g: x.light.state === 'on' ? x.light.attributes.rgb_color[1] : 0,
    b: x.light.state === 'on' ? x.light.attributes.rgb_color[2] : 0,
  })), 50).toHex();

  function handleTabChange(event, newValue) {
    setTabValue(newValue)
  }

  useEffect(() => {
    if (defaultColorTemp !== colorTemp) {
      setColorTemp(defaultColorTemp);
    }
  }, [defaultColorTemp]);

  useEffect(() => {
    if (defaultTabValue !== tabValue) {
      setTabValue(defaultTabValue);
    }
  }, [defaultTabValue]);

  function turnOnLight($switch) {
    if ($switch && $switch.state === 'off') {
      hass.callService('switch', 'turn_on', {
        entity_id: $switch.entity_id
      });
    }
  }


  function handleColorChange(color) {
    if (loading) {
      return;
    }
    if (!loading) {
      setLoading(true);
    }
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      const rgb = [
        color.rgb.r,
        color.rgb.g,
        color.rgb.b
      ];
      entities.forEach(({ light, $switch }) => {
        turnOnLight($switch);
        hass.callService('light', 'turn_on', {
          entity_id: light.entity_id,
          rgb_color: rgb
        });
      });
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }, 200);
  }

  function handleTempChange(event, newValue) {
    setColorTemp(newValue);
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      entities.forEach(({ light, $switch }) => {
        turnOnLight($switch);
        hass.callService('light', 'turn_on', {
          entity_id: light.entity_id,
          color_temp: newValue
        });
      });
    }, 200);
  }

  function handleBrightnessChange(event, newValue) {
    setBrightness(newValue);
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      entities.forEach(({ light, $switch }) => {
        turnOnLight($switch);
        hass.callService('light', 'turn_on', {
          entity_id: light.entity_id,
          brightness: newValue
        });
      });
    }, 200);
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
              <StyledTabList onChange={handleTabChange}>
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