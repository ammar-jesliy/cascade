import { Routes, Route } from 'react-router-dom'
import RegisterPage from './_auth/forms/RegisterPage'
import LoginPage from './_auth/forms/LoginPage'
import LandingPage from './pages/LandingPage'
import AuthLayout from './_auth/AuthLayout'
import Home from './_root/pages/Home'

const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<LandingPage/>}/>

        {/* Public routes */}
        <Route element={<AuthLayout/>}>
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/login' element={<LoginPage/>} />
        </Route>

        {/* Private routes */}
        <Route path='/app' element={<Home/>}/>
      </Routes>
    </>
  )
}

export default App
