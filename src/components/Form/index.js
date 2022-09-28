import React from 'react';
import { Button as MuiButton } from '@mui/material';
import styled from '@emotion/styled';


export const Button = styled(MuiButton)`
  border-radius: 8px;
  border: 1px solid rgba(117, 130, 235, 0.5);
  color: rgb(117, 130, 235);
  box-shadow: none;
  text-transform: none;
  padding: 6px 16px;
  svg {
    color: currentColor;
  }
  &:hover, &:active, &:focus {
    text-decoration: none;
    background-color: rgba(117, 130, 235, 0.04);
    border: 1px solid rgb(117, 130, 235);
    box-shadow: none;
  }
  ${props => props.active && `
    color: rgb(17, 24, 39);
    background-color: rgb(117, 130, 235);
    &:hover, &:active, &:focus {
      background-color: rgb(81, 91, 164);
    }
  `}
`;

export const FieldWrapper = styled.div`
  position: relative;
  width: calc(100% - 24px);
  margin: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding:12px 12px;
  flex-wrap: wrap;
`;
export const FieldInner = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 16px 0px;
`;

export const FieldTitle = styled.label`
  position: absolute;
  top: -10px;
  left: 8px;
  transform: translateY(-50%);
  font-weight: 800;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  font-size: 0.65rem;
  pointer-events: none;
  user-select: none;
  &:after {
    content: attr(data-val);
    padding-left: 4px;
    font-variant-numeric: tabular-nums;
    color: #fff;
  }
`;

export const RangeSlider = styled.div`
  position: relative;
  width: calc(100% - 24px);
  margin: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding:24px 12px;
  &::before,
  &::after {
    position: absolute;
    color: #fff;
    font-size: 0.9rem;
    font-weight: bold;
  }
  &::before {
    content: '${props => props.min}';
    left: 10px;
  }
  &::after {
    content: '${props => props.max}';
    right: 10px;
  }
  .title::after {
    content: attr(data-length);
    position: absolute;
    right: -16px;
    font-variant-numeric: tabular-nums;
    color: #fff;
  }

  input {
    -webkit-appearance: none;
    width: calc(100% - 70px);
    height: 2px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.314);
    outline: none;
    padding: 0;
    margin: 0;
    cursor: pointer;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: rgb(255, 255, 255);
      cursor: pointer;
      transition: all 0.15s ease-in-out;
      &:hover {
        background: rgb(212, 212, 212);
        transform: scale(1.2);
      }
    }
    &::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border: 0;
      border-radius: 50%;
      background: rgb(255, 255, 255);
      cursor: pointer;
      transition: background 0.15s ease-in-out;
      &:hover {
        background: rgb(212, 212, 212);
      }
    }
  }
`;