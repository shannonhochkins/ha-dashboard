import React from 'react';
import styled from '@emotion/styled';
import { Close } from '@mui/icons-material';


const ModalHeaderContainer = styled.div`
  height: 24px;
  padding: 10px;
  position: relative;
  display: flex;
`;

const IconContainer = styled.div`
  margin-right: 10px;
  svg, img {
    height: 24px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Title = styled.div`
  color: #fff;
  font-size: ${props => props.theme.modal.header.title.size};
  font-weight: ${props => props.theme.modal.header.title.weight};
`;

const Subtitle = styled.div`
  color: ${props => props.theme.modal.header.subtitle.color};
  font-size: ${props => props.theme.modal.header.subtitle.size};
  font-weight: ${props => props.theme.modal.header.subtitle.weight};
`;

const CloseIconContainer = styled.div`
  background: ${props => props.theme.colors.light2};
  width: 24px;
  height: 24px;
  border-radius: 100%;
  text-align: center;
  cursor: pointer;
  svg {
    color: #1a1a1a;
    height: 18px;
    margin-top: 3px;
  }
`;

// interface ModalHeaderProps {
//   /** Method to close the modal */
//   readonly close: () => void;
//   /** Icon of the header */
//   readonly icon: ReactNode;
//   /** Subtitle of the header */
//   readonly subtitle: string;
//   /** Title of the header */
//   readonly title: string;
// }

export const ModalHeader = (props) => {
  return (
    <ModalHeaderContainer>
      <IconContainer>
        {props.icon}
      </IconContainer>
      <TitleContainer>
        <Title>{props.title}</Title>
        <Subtitle>{props.subtitle}</Subtitle>
      </TitleContainer>
      <CloseIconContainer onClick={props.close}>
        <Close />
      </CloseIconContainer>
    </ModalHeaderContainer>
  );
};
