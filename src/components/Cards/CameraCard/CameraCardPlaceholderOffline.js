import React from 'react';

import NoVideoIconSvg from './no-video.svg';
import { EmptyContainer, IconContainer, TextContainer } from './CameraCardPlaceholderLoading';


export const OfflinePlaceholder = (props) => {
  return (
    <EmptyContainer>
      <IconContainer>
        <img src={NoVideoIconSvg} />
      </IconContainer>
      <TextContainer>
        Camera offline - {props.entity}
      </TextContainer>
    </EmptyContainer>
  );
};
