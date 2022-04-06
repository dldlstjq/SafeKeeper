import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { Component } from "react";
// import "./OpenVidu.css";
import UserVideoComponent from "./UserVideoComponent";
import logo from "assets/images/logo.png";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import PageLayout from "examples/LayoutContainers/PageLayout";
import SuiBox from "components/SuiBox";
import Grid from "@mui/material/Grid";
import * as tmImage from "@teachablemachine/image";
import { BASE_URL } from "index";
import { Link } from 'react-router-dom';

const OPENVIDU_SERVER_URL = "https://j6d101.p.ssafy.io:8443";
const OPENVIDU_SERVER_SECRET = "vonovono";
let labelContainer;
let seconds = 0;
let start = -1;
let end = 0;
class CCTV extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mySessionId: "SessionA",
      myUserName:
        /*'Participant' + Math.floor(Math.random() * 100)*/
        JSON.parse(localStorage.getItem("user")).userName,
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
      webcam: new tmImage.Webcam(200, 200, true),
      model: undefined,
      URL: "https://teachablemachine.withgoogle.com/models/14qScEGlI/",
      audiostate: false,
      videostate: true,
      check: false,
      count: 0,
      total: 0,
      maxPredictinos: 0,
      yes: 0.0,
      no: 0.0,
      contents: "",
      ok: true,
      user: JSON.parse(localStorage.getItem("user")),
      capture: false,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.init = this.init.bind(this);
    this.predict = this.predict.bind(this);
    this.loop = this.loop.bind(this);
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onbeforeunload);
    this.setmodel();
    // this.joinSession();
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }

  joinSession() {
    // --- 1) Get an OpenVidu object ---

    this.OV = new OpenVidu();

    this.init();
    // this.setState({ webcam: new tmImage.Webcam(200, 200, true) }); // width, height, flip
    // this.setState({ URL: "../../my_model/" });

    // --- 2) Init a session ---

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on("streamCreated", (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          // Update the state with the new subscribers
          this.setState({
            subscribers: subscribers,
          });
        });

        // On every Stream destroyed...
        mySession.on("streamDestroyed", (event) => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on("exception", (exception) => {
          console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // 'getToken' method is simulating what your server-side should do.
        // 'token' parameter should be retrieved and returned by your own backend
        this.getToken().then((token) => {
          // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token, { clientData: this.state.myUserName })
            .then(async () => {
              var devices = await this.OV.getDevices();
              // console.log(this.OV);
              // console.log("devices", devices);
              var videoDevices = devices.filter((device) => device.kind === "videoinput");

              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = this.OV.initPublisher(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: false, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: "480x480", // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              });

              // --- 6) Publish your stream ---

              mySession.publish(publisher);

              // Set the main video in the page to display our webcam and store our Publisher
              this.setState({
                currentVideoDevice: videoDevices[0],
                mainStreamManager: publisher,
                publisher: publisher,
              });

              // console.log("publisher", this.state.publisher);
              // console.log("currentVideoDevice", this.state.currentVideoDevice);
              // console.log("mainStreamManager", this.state.mainStreamManager);
            })
            .catch((error) => {
              console.log(
                "There was an error connecting to the session:",
                error.code,
                error.message
              );
            });
        });
      }
    );
  }

  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }
    this.state.webcam.stop();

    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: "SessionA",
      /*'Participant' + Math.floor(Math.random() * 100)*/
      myUserName: JSON.parse(localStorage.getItem("user")).userName,
      mainStreamManager: undefined,
      publisher: undefined,
    });
  }

  async switchCamera() {
    try {
      const devices = await this.OV.getDevices();
      var videoDevices = devices.filter((device) => device.kind === "videoinput");

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== this.state.currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = this.OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          //newPublisher.once("accessAllowed", () => {
          await this.state.session.unpublish(this.state.mainStreamManager);

          await this.state.session.publish(newPublisher);
          this.setState({
            currentVideoDevice: newVideoDevice,
            mainStreamManager: newPublisher,
            publisher: newPublisher,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  // 모델 세팅
  async setmodel() {
    // this.setState(URL: "https://teachablemachine.withgoogle.com/models/bNSPXCou8S/");
    // this.setState({ URL: "../../my_model/" });
    // console.log(this.state.URL);
    const modelURL = `${this.state.URL}model.json`;
    const metadataURL = `${this.state.URL}metadata.json`;
    // const modelURL = model;
    // const metadataURL = metadata;

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    this.setState({
      model: await tmImage.load(modelURL, metadataURL),
    });
    console.log("model", this.state.model);
    this.setState({
      maxPredictions: this.state.model.getTotalClasses(),
    });
    console.log("maxPredictinos", this.state.maxPredictions);
  }

  // 티처블 머신
  async init() {
    // Convenience function to setup a webcam
    const size = 200;
    const flip = true; // whether to flip the webcam
    // this.setState({ webcam: new tmImage.Webcam(size, size, flip) }); // width, height, flip
    // console.log(this.state.webcam);
    console.log("init 전 실행");
    await this.state.webcam.setup(); // request access to the webcam
    await this.state.webcam.play();

    window.requestAnimationFrame(this.loop);
    console.log("init 후 실행");

    // labelContainer = document.getElementById("label-container");
    // for (let i = 0; i < this.state.maxPredictions; i++) {
    //   // and class labels
    //   labelContainer.appendChild(document.createElement("div"));
    // }
  }

  async loop(timestamp) {
    // console.log("loop 실행");
    this.state.webcam.update(); // update the webcam frame
    await this.predict();
    window.requestAnimationFrame(this.loop);
  }

  async predict() {
    // // Prediction #1: run input through posenet
    // // estimatePose can take in an image, video or canvas html element
    // const { pose, posenetOutput } = await this.state.model.estimatePose(this.state.webcam.canvas);
    // console.log("predict 확인");
    // // Prediction 2: run input through teachable machine classification model
    // const prediction = await this.state.model.predict(posenetOutput);
    // if (prediction[0].probability.toFixed(2) > 0.99) {
    //   if (this.state.check) {
    //     this.setState({
    //       count: this.state.count + 1,
    //     });
    //     console.log(this.count);
    //     this.state.session
    //       .signal({
    //         data: `${this.state.myUserName},${this.state.count}`, // Any string (optional)
    //         to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
    //         type: "count", // The type of message (optional)
    //       })
    //       .then(() => {
    //         this.setState({ check: false });
    //       })
    //       .catch((error) => {});
    //   }
    //   this.setState({ status: "up" });
    // } else if (prediction[1].probability.toFixed(2) > 0.99) {
    //   this.setState({ status: "down" });
    //   this.setState({ check: true });
    // }

    const prediction = await this.state.model.predict(this.state.webcam.canvas);

    for (let i = 0; i < this.state.maxPredictions; i++) {
      if (prediction[i].className === "안전모착용") {
        this.setState({ yes: prediction[i].probability.toFixed(2) });
      } else if (prediction[i].className === "안전모미착용") {
        this.setState({ no: prediction[i].probability.toFixed(2) });
      }
      if (prediction[0].className === "안전모착용" && prediction[0].probability.toFixed(2) >= 0.7) {
        this.setState({ contents: "안전모 착용!!" });
        start = -1;
        end = 0;
        this.setState({ ok: true });
        this.setState({ capture: false });
      } else if (
        prediction[1].className === "안전모미착용" &&
        prediction[1].probability.toFixed(2) >= 0.7
      ) {
        seconds = new Date().getSeconds();
        if (start === -1) {
          start = seconds;
          // console.log("start", start);
        }
        end = seconds;
        // console.log("end", end);
        // 55초에 안쓴 상태에서 초가 바뀌어 2~3초로 갈 경우
        if (end < start) end += 60;
        if (start !== -1 && end - start >= 10) {
          this.setState({ contents: "안전모 미착용!!" });
          this.setState({ ok: false });
          this.setState({ count: this.state.count + 1 });

          console.log("경과시간", end - start);
          if (!this.state.capture) {
            this.setState({ capture: true });
            axios
              .post(BASE_URL + "/api/v1/accident", {
                accidentDate: new Date(),
                accidentDesc: "사진 설명",
                accidentPicture: "string",
                accidentType: "안전모 미착용",
                camera: {
                  cameraId: 2,
                  cameraPlace: "1층",
                  construction: {
                    constructName: this.state.user.construction.constructName,
                    constructionId: this.state.user.construction.constructionId,
                  },
                },
                room: {
                  roomId: 37,
                  roomName: "123",
                },
              })
              .then((res) => {})
              .catch((err) => console.log(err));
          }
        }
        // if (this.state.count % 20 === 0) {
        //   this.setState({ total: this.state.total + 1 });
        // }
      }
      const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
      // document.getElementById("labelContainer").childNodes[i].innerHTML = classPrediction;
      // labelContainer.childNodes[i].innerHTML = classPrediction;
      // console.log(classPrediction);
    }
  }

  render() {
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;

    return (
      <PageLayout>
        <div className="container">
          {this.state.session === undefined ? (
            <div id="join" style={{ display: "flex", flexFlow: "column", alignItems: "center" }}>
              <div id="img-div">
                <img
                  src={logo}
                  alt="OpenVidu logo"
                  style={{
                    width: "500px",
                    height: "300px",
                    marginTop:'8rem',
                    marginBottom:'3rem'
                  }}
                />
              </div>
              <div
                id="join-dialog"
                // className="jumbotron vertical-center"
              >
                <form className="form-group" onSubmit={this.joinSession}>
                  <p>
                    <label>닉네임: </label>
                    <input
                      className="form-control"
                      type="text"
                      id="userName"
                      value={myUserName}
                      onChange={this.handleChangeUserName}
                      required
                    />
                  </p>
                  <p>
                    <label> Session: </label>
                    <input
                      className="form-control"
                      type="text"
                      id="sessionId"
                      value={mySessionId}
                      onChange={this.handleChangeSessionId}
                      required
                    />
                  </p>
                  <p className="text-center">
                    <input
                      className="btn btn-lg btn-success"
                      name="commit"
                      type="submit"
                      value="입장"
                    />
                  </p>
                  <Link to="/room">
                    <ExitToAppIcon />
                    </Link>
                </form>
              </div>
            </div>
          ) : null}

          {this.state.session !== undefined ? (
            <div id="session">
              <div id="session-header">
                {/* <input
                className="btn btn-large btn-danger"
                type="button"
                id="buttonLeaveSession"
                onClick={this.leaveSession}
                value="나가기"
              /> */}
                <ExitToAppIcon id="buttonLeaveSession" onClick={this.leaveSession} />
              </div>

              {/* {this.state.mainStreamManager !== undefined ? (
              <div id="main-video" className="col-md-6">
                <UserVideoComponent
                  streamManager={this.state.mainStreamManager}
                />
                <input
                  className="btn btn-large btn-success"
                  type="button"
                  id="buttonSwitchCamera"
                  onClick={this.switchCamera}
                  value="Switch Camera"
                />
              </div>
            ) : null} */}
              <div
                id="video-container"
                className="video-container"
                style={{ display: "flex", flexFlow: "row", justifyContent: "center" }}
              >
                {this.state.publisher !== undefined ? (
                  <div
                    className="stream-container"
                    onClick={() => this.handleMainVideoStream(this.state.publisher)}
                  >
                    <UserVideoComponent streamManager={this.state.publisher} ok={this.state.ok} />
                    <div>안전모 착용: {this.state.yes}</div>
                    <div>안전모 미착용: {this.state.no}</div>
                    {this.state.ok === false && <h1 className="caution">{this.state.contents}</h1>}
                    {/* <div>{this.state.contents}</div> */}
                    {/* <div>횟수: {this.state.count}</div> */}
                  </div>
                ) : null}
                {this.state.subscribers.map((sub, i) => (
                  <div
                    key={i}
                    className="stream-container "
                    onClick={() => this.handleMainVideoStream(sub)}
                  >
                    <UserVideoComponent streamManager={sub} ok={this.state.ok} />
                    <div>안전모 착용: {this.state.yes}</div>
                    <div>안전모 미착용: {this.state.no}</div>
                    {this.state.ok === false && <h1 className="caution">{this.state.contents}</h1>}
                    {/* <div>{this.state.contents}</div> */}
                    {/* <div>횟수: {this.state.count}</div> */}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </PageLayout>
    );
  }

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
   *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
   *   3) The Connection.token must be consumed in Session.connect() method
   */

  getToken() {
    return this.createSession(this.state.mySessionId).then((sessionId) =>
      this.createToken(sessionId)
    );
  }

  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
          headers: {
            Authorization: "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("CREATE SESION", response);
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              "No connection to OpenVidu Server. This may be a certificate error at " +
                OPENVIDU_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(OPENVIDU_SERVER_URL + "/accept-certificate");
            }
          }
        });
    });
  }

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      var data = {};
      axios
        .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + sessionId + "/connection", data, {
          headers: {
            Authorization: "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("TOKEN", response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }
}

export default CCTV;
