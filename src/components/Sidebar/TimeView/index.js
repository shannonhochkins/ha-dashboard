import React from 'react';
import styled from '@emotion/styled'

const TimeContainer = styled.div`
  color: #FFFFFFE0;
  font-size: 40px;
  width: 100%;
  text-align: center;
  margin-top: 40px;
`;

export function TimeView() {
  function format2Digits(number) {
    return ('0' + number).slice(-2);
  }
  return (
    <TimeContainer>
      {format2Digits(new Date().getHours())}:{format2Digits(new Date().getMinutes())}
    </TimeContainer>
  );
};
