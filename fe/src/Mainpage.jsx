import { useNavigate, Link } from 'react-router-dom'
import { DialogComponent } from './component/Dialogs'
import { SignupForm, LoginForm, JoinRoomForm } from './Forms'
import logo from './images/logo-removebg.png'
import crane from './images/crane.jpg'
import { Fragment } from 'react'
import { P } from './Common'

export default function Mainpage({ user, setUser }) {
  const navigate = useNavigate()

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <img src={logo} alt="logo" style={{ width: '15%', height: '15%' }} />
        <div style={{ display: 'flex' }}>
          {!user && (
            <Fragment>
              <DialogComponent
                title={'회원가입'}
                color="sandybrown"
                margin="10px 20px 0 0"
                size="18px"
              >
                <SignupForm />
              </DialogComponent>
              <DialogComponent
                title={'로그인'}
                color="sandybrown"
                margin="10px 20px 0 0"
                size="18px"
              >
                <LoginForm setUser={setUser} />
              </DialogComponent>
            </Fragment>
          )}
          {user && (
            <P
              onClick={() => navigate('/usermain')}
              color="sandybrown"
              margin="10px 20px 0 0"
              size="18px"
            >
              방 참가
            </P>
          )}
          {/* <Bigbtn variant="contained" onClick={() => navigate('openvidu')}>
          OpenVidu
        </Bigbtn> */}
        </div>
      </div>

      <div
        style={{
          // backgroundImage: `url(${crane})`,

          background: `linear-gradient(to top left, transparent, mistyrose),url(${crane})`,
          backgroundSize: '100vw',
          backgroundRepeat: 'no-repeat',
          height: '80vh',
        }}
      >
        <h1 style={{ padding: 50, margin: 0 }}>안전 알림 솔루션</h1>
      </div>
    </div>
  )
}
