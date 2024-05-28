import { Routes, Route } from 'react-router-dom'
import RegisterPage from './_auth/forms/RegisterPage'
import LoginPage from './_auth/forms/LoginPage'
import LandingPage from './pages/LandingPage'
import AuthLayout from './_auth/AuthLayout'
import Home from './_root/pages/Home'
import RootLayout from './_root/RootLayout'
import MainPage from './_root/pages/MainPage'

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
        <Route element={<RootLayout />}>
          <Route path='/app' element={<Home/>}/>
          <Route path='/groups/:groupId' element={<MainPage/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
