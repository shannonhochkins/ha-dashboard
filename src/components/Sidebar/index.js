import React, { useContext, useEffect, useMemo, useState } from 'react';
import SimpleBar from 'simplebar-react';
import styled from '@emotion/styled';
import { useLocation, useNavigate } from "react-router-dom";
import { useResponsive } from '@root/hooks/useResponsive';
import { useInnerHeight } from '@root/hooks/useInnerHeight';
import { useRoutes } from '@root/routes';
import { TimeView } from '@components/Sidebar/TimeView/index';
import { WeatherCard } from '@components/Sidebar/Weather/index';
import { ListItem, IconButton, AppBar as MuiAppBar, Toolbar, AvatarGroup, Avatar, Divider, Drawer, Paper, List, ListSubheader } from '@mui/material';
import { Chair, Home, Warehouse, Weekend, TableBar, Blender, Bed, Menu, ChevronRight, ChevronLeft } from '@mui/icons-material';
import { HassContext } from '@root/context';
import shannon from './assets/shannon.jpg';
import tash from './assets/tash.jpg';

import { BatteryWarnings } from '@components/Alerts/BatteryWarnings';


export const SIDEBAR_WIDTH = 280;

const StyledMenu = styled(Menu)``;

const AppBar = styled(MuiAppBar)`
  background-color: transparent;
  box-shadow: none;
  ${props => `
    transition: ${props.theme.transitions.create(['margin', 'width'], {
      easing: props.theme.transitions.easing.easeOut,
      duration: props.theme.transitions.duration.enteringScreen,
    })};
  `}
  ${props => props.open && `
    width: ${`calc(100% - ${SIDEBAR_WIDTH}px)`};
    margin-left: ${SIDEBAR_WIDTH}px;
    transition: ${props.theme.transitions.create(['margin', 'width'], {
      easing: props.theme.transitions.easing.easeOut,
      duration: props.theme.transitions.duration.enteringScreen,
    })};
  `}
  ${props => props.desktop && `
    width: ${`calc(100% - ${SIDEBAR_WIDTH}px)`};
    margin-left: ${SIDEBAR_WIDTH}px;
    transition: ${props.theme.transitions.create(['margin', 'width'], {
      easing: props.theme.transitions.easing.easeOut,
      duration: props.theme.transitions.duration.enteringScreen,
    })};
    ${StyledMenu} {
      display: none;
    }
  `}
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  position: absolute;
  top:0;
  right: 0;
  z-index: 1000;
  button {
    cursor: pointer;
    color: white;
  }
`;


const StyledSimpleBar = styled(SimpleBar)`
  height: 100%;
`;

const StyledList = styled(List)`
  list-style: none;
  margin: 16px 0px 0px;
  padding: 0px 0px 8px;
  position: relative;
`;
const StyledListInner = styled(List)`
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
`;
const IconLabel = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;
const Suffix = styled.div`
  color: #6e6e6e;
  font-size: 12px;
`;
const StyledListItem = styled(ListItem)`
  -webkit-box-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
  text-decoration: none;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  display: flex;
  margin-bottom: 4px;
  padding: 0;
  a {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    outline: 0px;
    border: 0px;
    margin: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    font-size: 0.875rem;
    line-height: 1.75;
    min-width: 64px;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: none;
    padding: 9px 24px;
    border-radius: 8px;
    color: rgb(209, 213, 219);
    -webkit-box-pack: start;
    text-align: left;
    text-transform: none;
    width: 100%;
    background-color: transparent;
    font-weight: 400;
    letter-spacing: 0.3px;
    
    ${props => props.active && `
      color: rgb(16, 185, 129);
      background-color: rgba(255, 255, 255, 0.04);
      font-weight: 700;
    `}
    &:hover, &:active, &:focus {
      text-decoration: none;
      box-shadow: none;
      background-color: rgba(255, 255, 255, 0.04);
    }
    i {
      color: currentColor;
      display: inherit;
      margin-right: 8px;
      margin-left: -4px;
      svg {
        font-size: 20px;
      }
    }
  }
`;

const RouteName = styled.h2`
  font-size: 14px;
  padding-left: 20px;
`

const StyledListSubheader = styled(ListSubheader)`
  box-sizing: border-box;
  list-style: none;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  color: rgb(107, 114, 128);
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 2.5;
  text-transform: uppercase;
  background-color: transparent;
  padding-left: 0;
  margin-left: 0;
`;

const StyledDrawer = styled(Drawer)`
  flex: 0 0 auto;
  width: ${SIDEBAR_WIDTH}px;
  .MuiDrawer-paper {
    background-color: rgba(17, 24, 39, 1);
    ${props => props.desktop && `
      background-color: rgba(17, 24, 39, 0.7);
    `}
    border-right: 1px solid rgb(45, 55, 72);
    color: rgb(255, 255, 255);
    width: ${SIDEBAR_WIDTH}px;
    box-sizing: border-box;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
      width: 0;
    }
  }
`;

const SidebarContent = styled.div`
  padding: 0px 16px;
`;

const SidebarFooter = styled.div`
  padding: 16px;
`;


const StyledDivider = styled(Divider)`
  margin: 24px 0px;
  flex-shrink: 0;
  border-width: 0px 0px thin;
  border-style: solid;
  border-color: rgb(45, 55, 72);
`;

const PanelSection = styled.div`
  margin-top: 20px;
`;

const StyledAvatar = styled(Avatar)`
  ${props => !props.home && `
    filter: grayscale(100%);
  `}
`;


export function Sidebar() {
  const hass = useContext(HassContext);
  const location = useLocation();
  const routes = useRoutes(hass, location);
  const navigate = useNavigate();
  const displaySize = useResponsive();
  const maxHeight = useInnerHeight(height => height - 80);
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const goTo = (title, path) => () => {
    navigate(`/${path}`);
    window.parent.history.pushState({}, title, hass.hassUrl(`${__BASE_PATH__}/${path}`));
    setOpen(false);
  };
  const tashesHome = hass.states['device_tracker.natashas_iphone'].state === 'home';
  const shannonsHome = hass.states['device_tracker.shannons_phone'].state === 'home';

  const currentRoute = routes.find(route => route.pathname === location.pathname.slice(1));

  return (
    <>
      <AppBar position="fixed" open={open} desktop={displaySize === 'desktop'}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <StyledMenu />
            {displaySize !== 'desktop' && <RouteName>{currentRoute ? currentRoute.name : ''}</RouteName>}
            <BatteryWarnings />
          </IconButton>
        </Toolbar>
      </AppBar>
      <StyledDrawer
        desktop={displaySize === 'desktop'}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        onClose={handleDrawerClose}
        anchor="left"
        open={displaySize === 'desktop' ? true : open}
        hideBackdrop={displaySize === 'desktop'}
        variant={displaySize === 'desktop' ? 'permanent' : 'temporary'}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRight />
          </IconButton>
        </DrawerHeader>
        <StyledSimpleBar
          forceVisible="y"
          autoHide={false}
          style={{ maxHeight }}>
          <TimeView />
          <SidebarContent>
            <PanelSection>
              <WeatherCard />
            </PanelSection>
          </SidebarContent>
          <StyledDivider />
          <SidebarContent>
            <StyledList subheader={
              <StyledListSubheader>
                Areas
              </StyledListSubheader>
            }>
              <StyledListInner>
                {routes.map(({
                  active,
                  name,
                  pathname,
                  icon,
                  suffix
                }, index) => {
                  return <StyledListItem
                    active={active}
                    key={index}
                  >
                    <a onClick={goTo(name, pathname)}>
                      <IconLabel>
                        <i>
                          {icon}
                        </i>
                        <div>{name}</div>
                      </IconLabel>
                      {suffix && <Suffix>{suffix}</Suffix>}
                    </a>
                  </StyledListItem>
                })}
              </StyledListInner>
            </StyledList>
          </SidebarContent>
        </StyledSimpleBar>
        <SidebarFooter>
          <AvatarGroup>
            <StyledAvatar home={tashesHome} alt="Tash" src={tash} />
            <StyledAvatar home={shannonsHome} alt="Shannon" src={shannon} />
          </AvatarGroup>
        </SidebarFooter>
      </StyledDrawer>
    </>
  );
};
