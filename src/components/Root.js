import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { ThemeProvider, Global, css } from '@emotion/react';
import { AnimatePresence } from 'framer-motion';
import { createTheme } from '@mui/material/styles';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { HassContext } from '@root/context';

import { Sidebar } from './Sidebar';
import { useRoutes } from '@root/routes';

// warnings
import { FrontDoorOpened } from './Alerts/FrontDoorOpened';
import { FrontDoorBellRang } from './Alerts/FrontDoorBellRang';

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import 'simplebar/dist/simplebar.min.css';


const muiTheme = createTheme();

const Background = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: rgb(11, 15, 25);
  color: rgb(237, 242, 247);
`;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-wrap: nowrap;
  ${Background} {
    z-index: 0;
  }
`;


const Areas = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const minSwipeDistance = 250;

export function Dashboard() {  
  const hass = useContext(HassContext);
  const location = useLocation();
  const navigate = useNavigate();
  const routes = useRoutes(hass, location);
  const [direction, setDirection] = useState(1);
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  

  const onTouchStart = (e) => {
    setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX)
  }
  
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  
  const goTo = (title, path) => {
    navigate(`/${path}`);
    window.parent.history.pushState({}, title, hass.hassUrl(`${__BASE_PATH__}/${path}`));
  };
  
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe || isRightSwipe) {
      const newDirection = isLeftSwipe ? 1 : -1;
      const currentRouteIndex = routes.findIndex(route => route.pathname === location.pathname.slice(1));
      setDirection(newDirection);
      
      if (newDirection === -1) {
        // swiped right, technically go backwards
        const newRouteIndex = currentRouteIndex - 1 < 0 ? routes.length - 1 : currentRouteIndex - 1;
        const nextRoute = routes[newRouteIndex];
        goTo(nextRoute.name, nextRoute.pathname);
      }
      if (newDirection === 1) {
        // swiped left, technically go forwards
        const newRouteIndex = currentRouteIndex + 1 > routes.length - 1 ? 0 : currentRouteIndex + 1;
        const nextRoute = routes[newRouteIndex];
        goTo(nextRoute.name, nextRoute.pathname);
      }
    }
  }

  return (
    <ThemeProvider theme={muiTheme}>
      <Global
        styles={css`
          html, body, ${Wrapper} {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            font-family: "Roboto";
            overflow: hidden;
          }
        `}
      />
      <Wrapper>
        <Background />
        <Sidebar />
        <Areas onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
          <AnimatePresence custom={direction}>
            <Routes location={location} key={location.pathname} id="routes">
              {routes.map(route => <Route key={route.name} path={`/${route.pathname}`} element={route.render(direction)} />)}
            </Routes>
            <FrontDoorOpened id="front-door-opened" />
            <FrontDoorBellRang id="front-door-rang" />
          </AnimatePresence>
        </Areas>
      </Wrapper>
    </ThemeProvider>
  );

}

export default Dashboard;
