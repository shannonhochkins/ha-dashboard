import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import styled from '@emotion/styled';
import { Curtains, FirstPage, LastPage, Stop } from '@mui/icons-material';
import { FieldWrapper, FieldTitle, RangeSlider } from '@components/Form';
import { ModalContainer, ModalContent, ModalHeader, ModalStyle } from '@components/Modals';
import { HassContext } from '@root/context';
import { createRipples } from 'react-ripples';

Modal.setAppElement('html');
let timeout;


const ActionRipple = createRipples({
  during: 900,
});

const IconButtons = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;
const IconButton = styled(ActionRipple)`
  outline: none;
  border: 0;
  appearance: none;
  cursor: pointer;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  font-size: 0.65rem;
  user-select: none;
  display: flex;
  flex-direction: column;
  svg {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
`;
export const CoverCardModal = ({
  show,
  close,
  name,
  entity
}) => {

  const hass = useContext(HassContext);
  const cover = hass.states[entity];

  const [value, setValue] = useState(cover.attributes.current_position);

  useEffect(() => {
    if (cover.attributes.current_position !== value) {
      setValue(cover.attributes.current_position);
    }
  }, [cover.attributes.current_position])

  function handleChange(event) {
    const value = parseInt(event.target.value);
    setValue(value);
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      // call hass
      hass.callService('cover', 'set_cover_position', {
        entity_id: entity,
        position: value
      })
    }, 200);
  }

  return (
    <Modal
      isOpen={show}
      onRequestClose={close}
      contentLabel="Cover Properties"
      style={ModalStyle}
    >
      <ModalContainer>
        <ModalHeader
          title={name}
          subtitle={cover.state}
          close={close}
          icon={
            <Curtains />
          }
        />
        <ModalContent>
          <FieldWrapper>
            <FieldTitle>Controls:</FieldTitle>
            <IconButtons>
              <IconButton onClick={() => {
                  hass.callService('cover', 'close_cover', { entity_id: entity });
                }}>
                <FirstPage />
                CLOSE
              </IconButton>
              <IconButton onClick={() => {
                  hass.callService('cover', 'stop_cover', { entity_id: entity });
                }}>
                <Stop />
                STOP
              </IconButton>
              <IconButton onClick={() => {
                  hass.callService('cover', 'open_cover', { entity_id: entity });
                }}>
                <LastPage />
                OPEN
              </IconButton>
            </IconButtons>
          </FieldWrapper>
          <RangeSlider min={1} max={100}>
            <FieldTitle data-val={`${value}%`}>Current Position:</FieldTitle>
            <input type="range" onChange={handleChange} min={1} max={100} value={value} />
          </RangeSlider>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};