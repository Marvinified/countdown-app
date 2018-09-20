import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Clock } from "./clock";
import { CountDown } from "./countDown";
import DatePicker from "react-datepicker";
import moment from "moment";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

const Column = styled.div`
  display : flex;
  flex-direction : column
  flex-wrap : wrap;
  justify-content : center;
  align-items : center;
  text-align : center;
`;

const Button = styled.button`
  padding: 1em;
  background-color: #1c2022;
  color: white;
  border: 0.5em solid;
  cursor: pointer;
`;

const FullScreenWrap = styled.div`
  width  stretch;
  height stretch;
  position absolute;
  display flex;
  align-items  center;
  justify-content center;
  flex-direction column;
  // background-color : brown;

`;

const Credits = styled.div`
    position absolute;
    bottom 0;
    width  stretch;
    text-align center;
`;

const Link = styled.a`
    color #158384;
    text-decoration none;
`;
class App extends Component {
  state = {
    date: null,
    isFullScreen: false
  };
  countDownNode = null;
  toggleFullScreen = () => {
    this.setState(({ isFullScreen }) => ({ isFullScreen: !isFullScreen }));
    // console.log(this.countDownNode)
  };

  render() {
    const { isFullScreen } = this.state;
    return (
      <Fragment>
        {isFullScreen ? (
          <FullScreenWrap>
            <CountDown
              ref={node => (this.countDownNode = node)}
              style={{ fontSize: 80, color: "#158384" }}
              endTime={this.state.date}
            />
            <p>
              {this.state.date &&
                `Remaining Before ${this.state.date.toString()}`}
            </p>
            <Button onClick={this.toggleFullScreen}>Exit FullScreen</Button>
          </FullScreenWrap>
        ) : (
          <Column>
            <Clock />
            <h3>Select Countdown Date</h3>
            <DatePicker
              selected={this.state.date}
              onChange={date => {
                this.setState({ date });
              }}
              placeholderText="Set Countdown to"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={1}
              dateFormat="LLL"
              timeCaption="Time"
            />
            <CountDown
              ref={node => (this.countDownNode = node)}
              style={{ fontSize: 50, color: "#158384" }}
              endTime={this.state.date}
            />

            <p>
              {this.state.date &&
                `Remaining Before ${this.state.date.toString()}`}
            </p>
            <Button onClick={this.toggleFullScreen}>View in FullScreen</Button>
          </Column>
        )}
        <Credits>
          Made with ❤ by{" "}
          <Link href="https://marvinified.github.io">Marvinified</Link>
        </Credits>
      </Fragment>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
