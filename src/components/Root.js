import React, { Component } from 'react';
import styled from '@emotion/styled';
import { ThemeProvider, Global, css } from '@emotion/react';
import { Routes, Route, useLocation } from "react-router-dom";
import { Sidebar } from './Sidebar';
import { theme } from '../styles/theme';
import BackgroundImage from './background.png';

import { Home } from '../areas/Home';
import { Office } from '../areas/Office';

import { AnimatePresence } from 'framer-motion';


const BackgroundBlur = styled.div`
  background: url('${BackgroundImage}') no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  filter: blur(20px);
  -webkit-filter: blur(20px);
  height: 100%;
  width: 100%;
  position: absolute;
`;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-wrap: nowrap;
  > * {
    position:relative;
    z-index: 1;
  }
  ${BackgroundBlur} {
    z-index: 0;
  }
`;

const Areas = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export function Dashboard() {

  const location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={css`
          html, body, ${Wrapper} {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
          }
        `}
      />
      <Wrapper>
        <BackgroundBlur />
        <Sidebar />
        <Areas>
          <AnimatePresence>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/office" element={<Office />} />
            </Routes>
          </AnimatePresence>
        </Areas>
      </Wrapper>
    </ThemeProvider>
  );

}

export default Dashboard;
