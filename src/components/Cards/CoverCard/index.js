import React, { useState, useContext } from 'react';
import styled from '@emotion/styled';
import { AccessoryCard } from '@components/Cards';
import { HassContext } from '@root/context';
import { Curtains, CurtainsClosed, BlindsClosed, Blinds } from '@mui/icons-material';
import { useModalHelper } from '@root/hooks/useModalHelper';
import { CoverCardModal } from './modal';


export function CoverCard({ 
  entity,
  name,
  battery,
}) {

  const hass = useContext(HassContext);
  const { showModal, openModal, closeModal } = useModalHelper();
  const cover = hass.states[entity];
  const open = cover.state === 'open';
  const pos = cover.attributes.current_position;
  

  function onToggle() {
    hass.callService('cover', 'toggle', { entity_id: entity });
  }

  return <>
    <AccessoryCard
      iconActive={entity.toLowerCase().includes('curtain') ? <Curtains /> : <Blinds />}
      iconInactive={entity.toLowerCase().includes('curtain') ? <CurtainsClosed /> : <BlindsClosed />}
      name={`${name}${pos > 1 && pos < 100 ? ` - ${pos}%` : ''}`}
      isActive={open}
      handlePress={onToggle}
      handleLongPress={openModal}
      battery={battery}
    />
    <CoverCardModal
      name={name}
      entity={entity}
      show={showModal}
      close={closeModal} />
  </>
}

