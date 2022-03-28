import React, { Component, useState } from 'react'
// import './App.css'
import axios from 'axios'
import OpenViduSession from 'openvidu-react'

// export default function OpenVideo() {
//   const [flag, setFlag] = useState(false)

//   const [mySessionId, setMySessionId] = useState('SessionA')
//   const [myUserName, setMyUserName] = useState(
//     'OpenVidu_User_' + Math.floor(Math.random() * 100)
//   )
//   const [token, setToken] = useState({
//     token: '',
//     session: false,
//   })

//   const [OPENVIDU_SERVER_URL, setOPENVIDU_SERVER_URL] = useState(
//     'https://j6d101.p.ssafy.io:4443'
//   )
//   const [OPENVIDU_SERVER_SECRET, setOPENVIDU_SERVER_SECRET] =
//     useState('MY_SECRET')

//   const [handlerJoinSessionEvent, setHandlerJoinSessionEvent] = useState(this)
//   const [handlerLeaveSessionEvent, setHandlerLeaveSessionEvent] = useState(this)
//   const [handlerErrorEvent, setHandlerErrorEvent] = useState(this)
//   const [handleChangeSessionId, setHandleChangeSessionId] = useState(this)
//   const [handleChangeUserName, setHandleChangeUserName] = useState(this)
//   const [joinSession, setJoinSession] = useState(this)

//   // const mySessionId = this.state.mySessionId
//   //   const myUserName = this.state.myUserName
//   // const token = this.state.token

//   // this.OPENVIDU_SERVER_URL = 'https://j6d101.p.ssafy.io:4443'
//   // this.OPENVIDU_SERVER_SECRET = 'MY_SECRET'
//   // this.state = {
//   //   mySessionId: 'SessionA',
//   //   myUserName: 'OpenVidu_User_' + Math.floor(Math.random() * 100),
//   //   token: undefined,
//   // }

//   // this.handlerJoinSessionEvent = this.handlerJoinSessionEvent.bind(this)
//   // this.handlerLeaveSessionEvent = this.handlerLeaveSessionEvent.bind(this)
//   // this.handlerErrorEvent = this.handlerErrorEvent.bind(this)
//   // this.handleChangeSessionId = this.handleChangeSessionId.bind(this)
//   // this.handleChangeUserName = this.handleChangeUserName.bind(this)
//   // this.joinSession = this.joinSession.bind(this)

//   function fhandlerJoinSessionEvent() {
//     console.log('Join session')
//   }

//   function fhandlerLeaveSessionEvent() {
//     console.log('Leave session')
//     setHandlerLeaveSessionEvent(undefined)
//     // this.setState({
//     //   session: undefined,
//     // })
//   }

//   function fhandlerErrorEvent() {
//     console.log('Leave session')
//   }

//   function fhandleChangeSessionId(e) {
//     setMySessionId(e.target.value)
//     /*
//       this.setState({
//       mySessionId: e.target.value,
//     })*/
//   }

//   function fhandleChangeUserName(e) {
//     setMyUserName(e.target.value)
//     // this.setState({
//     //   myUserName: e.target.value,
//     // })
//   }

//   function fjoinSession(event) {
//     if (mySessionId && myUserName) {
//       fgetToken().then((token) => {
//         setToken({
//           token: token,
//           session: true,
//         })
//         setFlag(true)
//         // this.setState({
//         //   token: token,
//         //   session: true,
//         // })
//       })
//       event.preventDefault()
//     }
//   }

//   function fgetToken() {
//     return fcreateSession(mySessionId)
//       .then((sessionId) => createToken(sessionId))
//       .catch((Err) => console.error(Err))
//   }

//   function fcreateSession(sessionId) {
//     return new Promise((resolve, reject) => {
//       var data = JSON.stringify({ customSessionId: sessionId })
//       axios
//         .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
//           headers: {
//             Authorization:
//               'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
//             'Content-Type': 'application/json',
//           },
//         })
//         .then((response) => {
//           console.log('CREATE SESION', response)
//           resolve(response.data.id)
//         })
//         .catch((response) => {
//           var error = Object.assign({}, response)
//           if (error.response && error.response.status === 409) {
//             resolve(sessionId)
//           } else {
//             console.log(error)
//             console.warn(
//               'No connection to OpenVidu Server. This may be a certificate error at ' +
//                 OPENVIDU_SERVER_URL
//             )
//             if (
//               window.confirm(
//                 'No connection to OpenVidu Server. This may be a certificate error at "' +
//                   OPENVIDU_SERVER_URL +
//                   '"\n\nClick OK to navigate and accept it. ' +
//                   'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
//                   OPENVIDU_SERVER_URL +
//                   '"'
//               )
//             ) {
//               window.location.assign(
//                 OPENVIDU_SERVER_URL + '/accept-certificate'
//               )
//             }
//           }
//         })
//     })
//   }

//   function createToken(sessionId) {
//     return new Promise((resolve, reject) => {
//       var data = JSON.stringify({})
//       axios
//         .post(
//           OPENVIDU_SERVER_URL +
//             '/openvidu/api/sessions/' +
//             sessionId +
//             '/connection',
//           data,
//           {
//             headers: {
//               Authorization:
//                 'Basic ' + btoa('OPENVIDUAPP:' + this.OPENVIDU_SERVER_SECRET),
//               'Content-Type': 'application/json',
//             },
//           }
//         )
//         .then((response) => {
//           console.log('TOKEN', response)
//           resolve(response.data.token)
//         })
//         .catch((error) => reject(error))
//     })
//   }

//   return (
//     <div>
//       {!flag ? (
//         <div id="join">
//           <div id="join-dialog">
//             <h1> Join a video session </h1>
//             <form onSubmit={fjoinSession}>
//               <p>
//                 <label>Participant: </label>
//                 <input
//                   type="text"
//                   id="userName"
//                   value={myUserName}
//                   onChange={fhandleChangeUserName}
//                   required
//                 />
//               </p>
//               <p>
//                 <label> Session: </label>
//                 <input
//                   type="text"
//                   id="sessionId"
//                   value={mySessionId}
//                   onChange={fhandleChangeSessionId}
//                   required
//                 />
//               </p>
//               <p>
//                 <input name="commit" type="submit" value="JOIN" />
//               </p>
//             </form>
//           </div>
//         </div>
//       ) : (
//         <div id="session">
//           <OpenViduSession
//             id="opv-session"
//             sessionName={mySessionId}
//             user={myUserName}
//             token={token}
//             joinSession={fhandlerJoinSessionEvent}
//             leaveSession={fhandlerLeaveSessionEvent}
//             error={fhandlerErrorEvent}
//           />
//         </div>
//       )}
//     </div>
//   )
// }

class OpenVideo extends Component {
  constructor(props) {
    super(props)
    this.OPENVIDU_SERVER_URL = 'http://' + window.location.hostname + ':5443'
    this.OPENVIDU_SERVER_SECRET = 'MY_SECRET'
    this.state = {
      mySessionId: 'SessionA',
      myUserName: 'OpenVidu_User_' + Math.floor(Math.random() * 100),
      token: undefined,
    }

    this.handlerJoinSessionEvent = this.handlerJoinSessionEvent.bind(this)
    this.handlerLeaveSessionEvent = this.handlerLeaveSessionEvent.bind(this)
    this.handlerErrorEvent = this.handlerErrorEvent.bind(this)
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this)
    this.handleChangeUserName = this.handleChangeUserName.bind(this)
    this.joinSession = this.joinSession.bind(this)
  }

  handlerJoinSessionEvent() {
    console.log('Join session')
  }

  handlerLeaveSessionEvent() {
    console.log('Leave session')
    this.setState({
      session: undefined,
    })
  }

  handlerErrorEvent() {
    console.log('Leave session')
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    })
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    })
  }

  joinSession(event) {
    if (this.state.mySessionId && this.state.myUserName) {
      this.getToken().then((token) => {
        this.setState({
          token: token,
          session: true,
        })
      })
      event.preventDefault()
    }
  }

  render() {
    const mySessionId = this.state.mySessionId
    const myUserName = this.state.myUserName
    const token = this.state.token
    return (
      <div>
        {this.state.session === undefined ? (
          <div id="join">
            <div id="join-dialog">
              <h1> Join a video session </h1>
              <form onSubmit={this.joinSession}>
                <p>
                  <label>Participant: </label>
                  <input
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
                    type="text"
                    id="sessionId"
                    value={mySessionId}
                    onChange={this.handleChangeSessionId}
                    required
                  />
                </p>
                <p>
                  <input name="commit" type="submit" value="JOIN" />
                </p>
              </form>
            </div>
          </div>
        ) : (
          <div id="session">
            <OpenViduSession
              id="opv-session"
              sessionName={mySessionId}
              user={myUserName}
              token={token}
              joinSession={this.handlerJoinSessionEvent}
              leaveSession={this.handlerLeaveSessionEvent}
              error={this.handlerErrorEvent}
            />
          </div>
        )}
      </div>
    )
  }

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behaviour MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
   *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
   *   3) The Connection.token must be consumed in Session.connect() method
   */

  getToken() {
    return this.createSession(this.state.mySessionId)
      .then((sessionId) => this.createToken(sessionId))
      .catch((Err) => console.error(Err))
  }

  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId })
      axios
        .post(this.OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
          headers: {
            Authorization:
              'Basic ' + btoa('OPENVIDUAPP:' + this.OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('CREATE SESION', response)
          resolve(response.data.id)
        })
        .catch((response) => {
          var error = Object.assign({}, response)
          if (error.response && error.response.status === 409) {
            resolve(sessionId)
          } else {
            console.log(error)
            console.warn(
              'No connection to OpenVidu Server. This may be a certificate error at ' +
                this.OPENVIDU_SERVER_URL
            )
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  this.OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  this.OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(
                this.OPENVIDU_SERVER_URL + '/accept-certificate'
              )
            }
          }
        })
    })
  }

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({})
      axios
        .post(
          this.OPENVIDU_SERVER_URL +
            '/openvidu/api/sessions/' +
            sessionId +
            '/connection',
          data,
          {
            headers: {
              Authorization:
                'Basic ' + btoa('OPENVIDUAPP:' + this.OPENVIDU_SERVER_SECRET),
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          console.log('TOKEN', response)
          resolve(response.data.token)
        })
        .catch((error) => reject(error))
    })
  }
}

export default OpenVideo
