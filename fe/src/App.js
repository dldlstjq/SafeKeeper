import { Routes, Route, BrowserRouter } from 'react-router-dom';
import {SignupForm,LoginForm} from './Forms'
import Mainpage from './Mainpage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Mainpage />} />
        <Route path='signup' element={<SignupForm />} />
        <Route path='login' element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
