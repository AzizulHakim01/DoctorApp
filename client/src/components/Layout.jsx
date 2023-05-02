import React from 'react'
import '../styles/LayoutStyles.css'
import {adminMenu, userMenu} from '../Data/data'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {Avatar, Badge, message} from "antd"

const Layout = ({children}) => {
    const {user} = useSelector(state => state.user)
    const location = useLocation()
    const navigate = useNavigate()
    // rendering menu list

    const SidebarMenu = user ?. isAdmin ? adminMenu : userMenu
    const handleLogout = () => {
        localStorage.clear();
        message.success("logged out successfully")
        navigate("/login")
    }
    return (
        <>
            <div className="main">
                <div className="layout">
                    <div className="sidebar">
                        <div className="logo">
                            <h1>DOC APP</h1>
                        </div>
                        <hr/>
                        <div className="menu">
                            {
                            SidebarMenu.map((menu) => {
                                const isActive = location.pathname === menu.path
                                return (
                                    <>
                                        <div className={
                                            `menu-item ${
                                                isActive && "active"
                                            }`
                                        }>
                                            <i className={
                                                menu.icon
                                            }></i>
                                            <Link to={
                                                menu.path
                                            }>
                                                {
                                                menu.name
                                            }</Link>
                                        </div>
                                    </>
                                )
                            })
                        }
                            <div className={`menu-item`}
                                onClick={handleLogout}>
                                <i className={"fa-solid fa-right-from-bracket"}></i>
                                <Link to="/login">
                                    Log out</Link>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="header">
                            <div className="header-content" style={{cursor:'pointer'}}>
                                <Badge count={user?.notification.length} onClick={()=>{navigate("/notification");}}>
                                    <i className='fa-solid fa-bell'></i>
                                </Badge>
                                <Link to="/profile">
                                    {
                                    user ?. name
                                }</Link>
                            </div>
                        </div>
                        <div className="body">
                            {children}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout
