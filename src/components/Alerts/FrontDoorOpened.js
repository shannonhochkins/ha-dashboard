import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { DoorSliding } from '@mui/icons-material';
import { HassContext } from '@root/context';
import Modal from 'react-modal';
import { ModalContainer, ModalContent, ModalHeader, ModalStyle } from '@components/Modals';
import { useModalHelper } from '@root/hooks/useModalHelper';

import frontDoor from './assets/front-door-open.jpg';

Modal.setAppElement('html');

const FrontDoor = styled.div`
  width: 300px;
  height: 300px;
  background-image: url('${frontDoor}');
  background-size: cover;
  background-position: center center;
`;

export function FrontDoorOpened() {  
  const hass = useContext(HassContext);
  const { showModal, openModal, closeModal } = useModalHelper();
  const frontDoorOpened = hass.states['binary_sensor.front_door_contact_sensor'].state === 'on';
  if (frontDoorOpened && !showModal) {
    openModal();
  } else if (!frontDoorOpened && showModal) {
    closeModal();
  }
  return <Modal
      isOpen={showModal}
      onRequestClose={closeModal}
      contentLabel="Front Door"
      style={ModalStyle}
    >
      <ModalContainer>
        <ModalHeader
          title={'Front Door'}
          subtitle={'The front door is open'}
          close={closeModal}
          icon={
            <DoorSliding />
          }
        />
        <ModalContent>
          <FrontDoor />
        </ModalContent>
      </ModalContainer>
    </Modal>;
}
