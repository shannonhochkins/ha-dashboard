import React, { useContext } from 'react';
import { ProSidebar, SidebarHeader, SidebarContent, SidebarFooter, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import styled from '@emotion/styled';
import { useLocation, useNavigate, Link } from "react-router-dom";
import { TimeView } from '../Widgets/TimeView/index';
import { WeatherCard } from '../Widgets/Weather/index';
import { Chair, Home } from '@mui/icons-material';
import 'react-pro-sidebar/dist/css/styles.css';
import { HassContext } from '../../context';


const StyledProSidebar = styled(ProSidebar)`
  height: 100%;
  background-color: #20202050;
  width: 360px;
  .pro-sidebar-inner {
    height: 100%;
    padding: 30px;
    box-sizing: border-box;
  }
`;

const PanelSection = styled.div`
  margin-top: 20px;
`

export function Sidebar() {

  const hass = useContext(HassContext);
  const navigate = useNavigate();
  // const location = useLocation();
  const goTo = (title, path) => () => {
    navigate(`/${path}`);
    window.parent.history.pushState({}, title, hass.hassUrl(`${__BASE_PATH__}/${path}`));
  };

  return (
    <StyledProSidebar>
      <SidebarHeader>
        <TimeView />
        <PanelSection>
          <WeatherCard />
        </PanelSection>
      </SidebarHeader>
      <SidebarContent>
        <Menu>
          <MenuItem active={location.pathname === '/'} onClick={goTo('Home', '')} icon={<Home />}>Home</MenuItem>
          <MenuItem active={location.pathname === '/office'} onClick={goTo('Office', 'office')} icon={<Chair />}>Office</MenuItem>
        </Menu>
      </SidebarContent>
      <SidebarFooter>

      </SidebarFooter>
    </StyledProSidebar>
  );
};
