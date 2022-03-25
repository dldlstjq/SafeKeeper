import { Bigbtn } from './Common'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { DialogComponent } from './component/Dialogs'
import { SignupForm, LoginForm } from './Forms'

export default function Mainpage({ user, setUser }) {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
  )
}
