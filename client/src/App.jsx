import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Register from './pages/Register'
import {useSelector} from 'react-redux'
import Spinner from './components/Spinner'
import ProtectedRoutes from './components/ProtectedRoutes'
import PublicRoute from './components/PublicRoute'
import ApplyDoctor from './pages/ApplyDoctor'
import NotificationPage from './components/NotificationPage'

function App() {
    const {loading} = useSelector(state => state.alerts)
    return (
        <>
            <BrowserRouter> {
                loading && < Spinner />
            }
                <Routes>
                    <Route path='/'
                        element={
                            <ProtectedRoutes><Homepage/></ProtectedRoutes>
                        }/>
                        <Route path='/apply-doctor'
                        element={
                            <ProtectedRoutes><ApplyDoctor/></ProtectedRoutes>
                        }/>
                        
                        <Route path='/notification'
                        element={
                            <ProtectedRoutes><NotificationPage/></ProtectedRoutes>
                        }/>
                    <Route path='/login'
                        element={
                            <PublicRoute><Login/></PublicRoute>
                        }/>
                    <Route path='/register'
                        element={
                            <PublicRoute><Register/></PublicRoute>
                        }/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
