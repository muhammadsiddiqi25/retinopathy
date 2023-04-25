import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';
import FileUpload from './components/FileUpload';
import Report from './components/Report';
import { PrivateRoutes } from './RestrictedRoutes';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path = '/' element = {<Login />} />
        <Route exact path = '/register' element = {<Signup />} />
        <Route path='/' element={<PrivateRoutes />} >
        <Route exact path = '/upload' element = {<FileUpload />} />
        <Route exact path = '/report/:img' element = {<Report />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
