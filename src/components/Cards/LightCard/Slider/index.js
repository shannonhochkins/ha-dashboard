import React, { useState } from 'react';
import styled from '@emotion/styled';


const SliderContainer = styled.div`
  height: 280px;
`;

export const CustomSlider = styled.input`
  -webkit-appearance: none;
  /* Width */
  height: 90px; 
  /* Height */
  width: 260px;
  margin-top: 80px;
  outline: none;
  border-radius: 20px;
  background: #F0F0F0;
  overflow: hidden;
  transform: rotate(-90deg);

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 40px;
    border-radius: 20px;
    border: 8px solid ${props => props.color};
    box-shadow: -100vw 0 0 100vw ${props => props.color};
  }
`;

let timeout;
export const Slider = (props) => {
  const [value, setValue] = useState(props.value);

  function handleChange(event) {
    const value = parseInt(event.target.value);
    setValue(value);
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      props.onChange(value);
    }, 200);
  }

  return (
    <SliderContainer>
      <CustomSlider
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        color={props.color}
      />
    </SliderContainer>
  );
};
