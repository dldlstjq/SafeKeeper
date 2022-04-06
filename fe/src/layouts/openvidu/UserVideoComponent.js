import React, { Component } from "react";
import OpenViduVideoComponent from "./OvVideo";
import "./UserVideo.css";

export default class UserVideoComponent extends Component {
  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
  }

  render() {
    return (
      <div>
        {this.props.streamManager !== undefined && this.props.ok === true ? (
          <div className="streamcomponent" style={{ borderStyle: "solid", borderColor: "green" }}>
            <OpenViduVideoComponent streamManager={this.props.streamManager} ok={this.props.ok} />
            <div>
              <p>{this.getNicknameTag()}</p>
            </div>
          </div>
        ) : (
          <div className="streamcomponent" style={{ borderStyle: "solid", borderColor: "red" }}>
            <OpenViduVideoComponent streamManager={this.props.streamManager} ok={this.props.ok} />
            <div>
              <p>{this.getNicknameTag()}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
