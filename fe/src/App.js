import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { SignupForm, LoginForm } from './Forms'
import Mainpage from './Mainpage'
import { ComboBox } from './Test'
import { injectGlobal } from '@emotion/css'
import { GridPractice } from './Test'
import { Appbar } from './Appbar'
import { useState } from 'react'
import Usermain from './Usermain'
import { Room } from './Room'
import { Box } from '@mui/material'

injectGlobal`
  body{
    margin:0;
    padding:0;
    // background-color:black;
  }
`

function App() {
  const [jwt, setjwt] = useState(localStorage.getItem('jwt'))

  return (
    <BrowserRouter>
      <Box minHeight="100vh">
        {/* <Appbar jwt={jwt} setjwt={setjwt} /> */}
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="signup" element={<SignupForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="test" element={<GridPractice />} />
          <Route path="usermain" element={<Usermain />} />
          <Route path="room/:roomId" element={<Room />} />
        </Routes>
      </Box>
    </BrowserRouter>
  )
}

export default App
