import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
const App = () => {
  return (
   <div className="bg-[url(bgImage.svg)] bg-contain">
   <Routes>
      <Route path='/' element={<Home></Home>} />
      <Route path='/login' element={<LoginPage></LoginPage>} />
      <Route path='/profile' element={<ProfilePage></ProfilePage>} />

   </Routes>
   </div>
  )
}

export default App
