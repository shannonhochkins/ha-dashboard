import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useResponsive } from '@root/hooks/useResponsive';
import { SIDEBAR_WIDTH } from '@components/Sidebar';
import { useInnerHeight } from '@root/hooks/useInnerHeight';
import SimpleBar from 'simplebar-react';
import { CropLandscapeOutlined } from '@mui/icons-material';


const Space = styled.div`
  width: 100%;
  height: 60px;
`;
const StyledSimpleBar = styled(SimpleBar)`
  height: 100%;
  width:100%;
  min-height: 100vh;
  .simplebar-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 100vh;
  }
`;

const AreaBaseStyled = styled(motion.div)`
  ${props => `
    transition: ${props.theme.transitions.create(['padding-left', 'width'], {
      easing: props.theme.transitions.easing.easeOut,
      duration: props.theme.transitions.duration.enteringScreen,
    })};
  `}
  padding-left: 0px;
  width: 100%;
  max-width: 100%;
  height: 100%;
  
  position: absolute;
  top: 0;
  left: 0;
  overflow-y: scroll;
  ${props => props.size !== 'desktop' && `
    padding: 60px 20px 0;
    width: calc(100% - 40px);
  `}
  ${props => props.size === 'desktop' && `
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-direction: row;
    overflow: hidden;
    padding-left: ${SIDEBAR_WIDTH}px;
    width: calc(100% - ${SIDEBAR_WIDTH}px);
    ${Space} {
      height: 0;
    }
  `}
`;

const variants = {
  enter: (direction) => {
    return {
      x: (window.innerWidth * -1) * (direction * -1),
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: window.innerWidth * (direction * -1),
      opacity: 0,
    };
  }
};


export function AreaBase({ children, className, direction }) {
  const displaySize = useResponsive();
  const maxHeight = useInnerHeight(height => height - 60);
  return <AreaBaseStyled
    size={displaySize}
    className={className}
    variants={variants}
    custom={direction}
    initial="enter"
    animate="center"
    exit="exit"
    transition={{
      y: { type: "spring", stiffness: 300, damping: 30, duration: 0.5 },
      opacity: { duration: 0.4 }
    }}>
      <StyledSimpleBar
        size={displaySize}
        forceVisible="y"
        autoHide={false}
        style={{ maxHeight }}>
        {children}
        <Space />
      </StyledSimpleBar>
    
  </AreaBaseStyled>
}