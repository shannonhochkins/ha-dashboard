import styled from '@emotion/styled';


export const ModalContainer = styled.div`
  background-color: #262b31;
  width: 350px;
  border-radius: 10px;
  z-index: 999;
`;

export const ModalContent = styled.div`
  text-align: center;
  display: flex;
  padding: 10px 25px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const ModalStyle = {
  overlay: {
    padding: 0,
    backgroundColor: '#404040CC',
    zIndex: 9,
  },
  content: {
    background: 'transparent',
    border: 'none',
    padding: 0,
    top: '50%',
    right: 'initial',
    bottom: 'initial',
    left: 'calc(50%)',
    transform: 'translateY(-50%)',
  },
};
