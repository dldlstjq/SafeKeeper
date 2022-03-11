import { Routes, Route, BrowserRouter } from 'react-router-dom';
import {SignupForm,LoginForm} from './Forms'
import Mainpage from './Mainpage.jsx'
import { ComboBox } from './Test';
import { injectGlobal } from '@emotion/css';

injectGlobal`
  body{
    margin:0;
    padding:0;
    background-color:#D8D6CC;
  }
`

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Mainpage />} />
          <Route path='signup' element={<SignupForm />} />
          <Route path='login' element={<LoginForm />} />
          <Route path='test' element={<ComboBox />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
