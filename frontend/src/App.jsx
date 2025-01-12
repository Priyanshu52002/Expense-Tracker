import {Routes ,Route,Navigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Expenses from './pages/Expenses'
import AddExpense from './pages/AddExpense'
import EditExpense from './pages/EditExpense'
import WelcomePage from './pages/Welcome'
import NotFound from './pages/NotFound'
import RefreshHandler from './component/RefreshHandler'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <div>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>

        <Route path="/" element={<WelcomePage/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />

        <Route path="/home" element={<ProtectedRoute element={<Expenses/>}/>}/>
        <Route path="/add" element={<ProtectedRoute element={<AddExpense/>}/>}/>
        <Route path="/edit/:id" element={<ProtectedRoute element={<EditExpense/>}/>}/>

        <Route path="*" element={<NotFound/>}/>
        
      </Routes>
    </div>
  )
}

export default App;
