import { Bigbtn } from './Common'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { DialogComponent } from './component/Dialogs'
import { SignupForm, LoginForm } from './Forms'
import logo from './images/logo-removebg.png'
import crane from './images/crane.jpg'

export default function Mainpage({ user, setUser }) {
  const navigate = useNavigate()

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <img src={logo} alt="logo" style={{ width: '20%' }} />
      </div>
      <div
        style={{
          display: 'inline-flex',
          backgroundImage: `url(${crane})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
        }}
      ></div>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // height: '100vh',
          // justifyContent: 'center',
        }}
      >
        <DialogComponent title={'회원가입'}>
          <SignupForm />
        </DialogComponent>

        {!user && (
          <DialogComponent title={'로그인'}>
            <LoginForm setUser={setUser} />
          </DialogComponent>
        )}
        <Bigbtn variant="contained">참가</Bigbtn>
        <Bigbtn variant="contained" onClick={() => navigate('openvidu')}>
          OpenVidu
        </Bigbtn>
      </Box>
    </div>
  )
}
