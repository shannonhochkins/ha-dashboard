import React from 'react';
// areas / rooms
import { Home } from '@areas/Home';
import { Office } from '@areas/Office';
import { Dining } from '@areas/Dining';
import { Living } from '@areas/Living';
import { Kitchen } from '@areas/Kitchen';
import { Garage } from '@areas/Garage';
import { MasterBedroom } from '@areas/MasterBedroom';
import { Chair, Home as HomeIcon, Warehouse, Weekend, TableBar, Blender, Bed } from '@mui/icons-material';

export const useRoutes = (hass, location) => {
  const livingTemp = hass.states['sensor.living_room_temperature_sensor_2'];
  const officeTemp = hass.states['sensor.office_temperature_sensor_2'];
  const masterTemp = hass.states['sensor.master_bed_temperature_sensor_2'];
  const kitchenTemp = hass.states['sensor.pantry_contact_sensor_temperature'];
  const garageTemp = hass.states['sensor.garage_door_contact_sensor_temperature'];
  //sensor.evies_room_temperature_sensor_2
  return [{
    name: 'Home',
    icon: <HomeIcon />,
    pathname: '',
    render: direction => <Home direction={direction} />,
    active: location.pathname === '/',
  }, {
    name: 'Living Room',
    icon: <Weekend />,
    pathname: 'living-room',
    active: location.pathname === '/living-room',
    render: direction => <Living direction={direction} />,
    suffix: `${livingTemp.state}${livingTemp.attributes.unit_of_measurement}`
  }, {
    name: 'Dining Room',
    icon: <TableBar />,
    pathname: 'dining-room',
    render: direction => <Dining direction={direction} />,
    active: location.pathname === '/dining-room',
  }, {
    name: 'Kitchen',
    icon: <Blender />,
    pathname: 'kitchen',
    render: direction => <Kitchen direction={direction} />,
    active: location.pathname === '/kitchen',
    suffix: `${kitchenTemp.state}${kitchenTemp.attributes.unit_of_measurement}`
  }, {
    name: 'Master Bedroom',
    icon: <Bed />,
    pathname: 'master-bedroom',
    active: location.pathname === '/master-bedroom',
    render: direction => <MasterBedroom direction={direction} />,
    suffix: `${masterTemp.state}${masterTemp.attributes.unit_of_measurement}`
  }, {
    name: 'Office',
    icon: <Chair />,
    pathname: 'office',
    active: location.pathname === '/office',
    render: direction => <Office direction={direction} />,
    suffix: `${officeTemp.state}${officeTemp.attributes.unit_of_measurement}`
  }, {
    name: 'Garage',
    icon: <Warehouse />,
    pathname: 'garage',
    active: location.pathname === '/garage',
    render: direction => <Garage direction={direction} />,
    suffix: `${garageTemp.state}${garageTemp.attributes.unit_of_measurement}`
  }];
}
