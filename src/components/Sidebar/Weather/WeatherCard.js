import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { WeatherRow } from './WeatherRow';

const apiKey = '6fab242a97455d7bbda28668ee6c028c';

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const result = (await axios.get(url)).data;
  const weatherInfo = {
    temp: Math.floor(result.main.temp),
    main: result.weather[0].main,
    city: result.name,
    timezone: result.timezone,
    iconId: result.weather[0].icon
  };
  return weatherInfo;
}

const CardTitle = styled.div`
  width: 100%;
  height: 30px;
  line-height: 30px;
  background-color: rgba(255, 255, 255, 0.04);
  color: rgb(209, 213, 219);;
  padding-left: 10px;
  box-sizing: border-box;
  font-size: 13px;
  font-weight: font-weight: 500;
`;

const WeatherCardContainer = styled.div`
  width: 100%;
  height: initial;
  padding: 0px;
  cursor: unset;
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  cursor: pointer;
  overflow: hidden;
  user-select: none;
  border-radius: 12px;
`;

const cities = [
  'Hamlyn Terrace, AU',
];

async function loadWeathers(cities) {
    const promises = cities.map((city) => getWeather(city));
    const results = await Promise.all(promises);
    return results;
}
export function WeatherCard() {
  const [weather, setWeather] = useState();

  useEffect(() => {
    loadWeathers(cities).then((results) => {
      setWeather(results);
    });
  }, []);

  return (
    <WeatherCardContainer>
      <CardTitle>Weather</CardTitle>
      {weather && weather.map((w) => (
        <WeatherRow key={w.city} weather={w} />
      ))}
    </WeatherCardContainer>
  );
}
