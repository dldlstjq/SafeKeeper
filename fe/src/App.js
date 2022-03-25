import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { SignupForm, LoginForm } from './Forms'
import Mainpage from './Mainpage'
import { injectGlobal } from '@emotion/css'
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
    background-color:black;
  }
`

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  return (
    <BrowserRouter>
      <Box minHeight="100vh">
        <Routes>
          <Route path="/" element={<Mainpage user={user} setUser={setUser} />} />
          <Route path="usermain" element={<Usermain user={user} />} />
          <Route path="room/:roomId" element={<Room />} />
          <Route path="openvidu" element={<OpenVidu />} />
        </Routes>
      </Box>
    </BrowserRouter>
  )
}

export default App
