import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { NotificationsActive } from '@mui/icons-material';
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

export function FrontDoorBellRang() {  
  const hass = useContext(HassContext);
  const doorbell = hass.states['binary_sensor.front_door_ding'];
  const rang = doorbell.state === 'on';
  const { showModal, openModal, closeModal } = useModalHelper();
  const frontDoorOpened = hass.states['binary_sensor.front_door_contact_sensor'].state === 'on';
  if (rang && !showModal) {
    openModal();
  } else if (!rang && frontDoorOpened && showModal) {
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
            <NotificationsActive />
          }
        />
        <ModalContent>
          <FrontDoor />
        </ModalContent>
      </ModalContainer>
    </Modal>;
}

