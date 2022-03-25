import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { SignupForm, LoginForm } from './Forms'
import Mainpage from './Mainpage'
import { injectGlobal } from '@emotion/css'
import { Appbar } from './Appbar'
import { useState } from 'react'
import Usermain from './Usermain'
import { Room } from './Room'
import { Box } from '@mui/material'
import OpenVidu from './OpenVidu'
// import Test from './room/Test'
// import Test2 from './Test2'

injectGlobal`
  body{
    margin:0;
    padding:0;
    // background-color:black;
  }
`

function App() {
  const [user, setuser] = useState(Number(localStorage.getItem('user')))

  return (
    <BrowserRouter>
      <Box minHeight="100vh">
        {/* <Appbar jwt={jwt} setjwt={setjwt} /> */}
        <Routes>
          <Route path="/" element={<Mainpage user={user} />} />
          <Route path="signup" element={<SignupForm />} />
          <Route path="login" element={<LoginForm setuser={setuser} />} />
          <Route path="usermain" element={<Usermain user={user} />} />
          <Route path="room/:roomId" element={<Room />} />
          <Route path="openvidu" element={<OpenVidu />} />
          {/* <Route path="test" element={<Test />} />
          <Route path="test2" element={<Test2 />} /> */}
        </Routes>
      </Box>
    </BrowserRouter>
  )
}

export default App
