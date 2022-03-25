import { Bigbtn } from './Common'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { DialogComponent } from './component/Dialogs'
import { SignupForm, LoginForm } from './Forms'

export default function Mainpage({ user }) {
  const navigate = useNavigate()

  return (
    <Box
      sx={
        {
          // display: 'flex',
          // flexDirection: 'row',
          // justifyContent: 'center',
        }
      }
    >
      <DialogComponent title={'회원가입'}>
        <SignupForm />
      </DialogComponent>

      {!user && (
        <DialogComponent title={'로그인'}>
          <LoginForm />
        </DialogComponent>
      )}
      <Bigbtn variant="contained">참가</Bigbtn>
    </Box>
  )
}
