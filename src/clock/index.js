import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    display : flex;
    align-items : center;
    justify-content : center; 
    width : ${({ style }) =>
      style && style.height
        ? typeof style.height === "number"
          ? `${style.height}px`
          : style.height
        : "10em"};
    height : ${({ style }) =>
      style && style.width
        ? typeof style.width === "number"
          ? `${style.width}px`
          : style.width
        : "10em"};

    border-radius: ${({ type }) => type === "circle" && "50%"};
    box-shadow : .1em .1em 1em 0em rgba(0, 0, 0, .3);
    padding: 1em;
    font-size: 24px;

`;

const Line = styled.line`
  stroke : rgb(0, 0, 0);
  stroke-width : 2
  transform : ${({ deg }) => deg && `rotateZ(${deg}deg)`};
  transform-origin : center ;

`;

export class Clock extends Component {
  state = {
    minutes: new Date().getMinutes(),
    hour: new Date().getHours(),
    seconds: new Date().getSeconds()
  };

  componentDidMount() {
    setInterval(() => {
      const date = new Date();
      const hour = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      this.setState({ seconds, minutes, hour });
    }, 1000);
  }
  minutesToDegrees(minute) {
    return (360 / 60) * minute;
  }

  secondsToDegrees(seconds) {
    return this.minutesToDegrees(seconds);
  }

  hourToDegrees(hour) {
    if (hour > 12) hour = hour - 12;
    return (360 / 12) * hour;
  }
  render() {
    const { type, ...rest } = this.props;
    const { style } = rest;
    const { hour, minutes, seconds } = this.state;
    return (
      <Wrapper type={type} {...rest}>
        <svg width="100%" height="100%">
          <Line
            x1="50%"
            y1="50%"
            x2="50%"
            y2="15%"
            deg={this.minutesToDegrees(minutes)}
          />
          <Line
            x1="50%"
            y1="50%"
            x2="50%"
            y2="25%"
            deg={this.hourToDegrees(hour)}
          />
          <Line
            x1="50%"
            y1="50%"
            x2="50%"
            y2="10%"
            deg={this.secondsToDegrees(seconds)}
            style={{ stroke: "rgb(225, 0, 0)", strokeWidth: 1 }}
          />
          <circle cx="50%" cy="50%" r=".2em" />
          <text
            fill={style && style.color && style.color}
            x={
              style && (style.width || style.height)
                ? `${(style.width || style.height) / 2 - 12}px`
                : "4.5em"
            }
            y="18px"
          >
            12
          </text>
          <text
            fill={style && style.color && style.color}
            x={
              style && (style.width || style.height)
                ? `${(style.width || style.height) - 12}px`
                : "9.5em"
            }
            y={
              style && (style.width || style.height)
                ? `${(style.width || style.height) / 2 + 8}px`
                : "5.35em"
            }
          >
            3
          </text>
          <text
            fill={style && style.color && style.color}
            x={
              style && (style.width || style.height)
                ? `${(style.width || style.height) / 2 - 6}px`
                : "4.7em"
            }
            y={
              style && (style.width || style.height)
                ? `${(style.width || style.height) - 12}px`
                : "10em"
            }
          >
            6
          </text>
          <text
            fill={style && style.color && style.color}
            x="0"
            y={
              style && (style.width || style.height)
                ? `${(style.width || style.height) / 2 + 8}px`
                : "5.35em"
            }
          >
            9
          </text>
        </svg>
        <div />
      </Wrapper>
    );
  }
}
