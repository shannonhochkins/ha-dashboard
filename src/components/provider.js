import React from 'react';
import {
  BrowserRouter
} from "react-router-dom";
import Root from './Root';
import { ConfigurationContext, HassContext } from '../context';

export function Provider({ hass, showMenu, narrow, panel }) {
    return (
        <ConfigurationContext.Provider value={panel.config}>
            <HassContext.Provider value={hass}>
              <BrowserRouter basename={__BASE_PATH__}>
                <Root />
              </BrowserRouter>
            </HassContext.Provider>
        </ConfigurationContext.Provider>
    )
}