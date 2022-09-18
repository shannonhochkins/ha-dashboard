import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';


const AreaBaseStyled = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const variants = {
  enter: () => {
    return {
      x: window.innerWidth,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: () => {
    return {
      zIndex: 0,
      x: window.innerWidth,
      opacity: 0
    };
  }
};


export function AreaBase({ children, className }) {
  return <AreaBaseStyled
  className={className}
  variants={variants}
  initial="enter"
  animate="center"
  exit="exit"
  transition={{
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 }
  }}>
    {children}
  </AreaBaseStyled>
}