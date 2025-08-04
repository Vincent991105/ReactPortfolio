import './css/MenuBar.css'
import Home from '../assets/SVG/Home.svg?react'
import Document from '../assets/SVG/Document.svg?react'
import Component from '../assets/SVG/Component.svg?react'
import { useLocation, useNavigate } from 'react-router-dom'

function MenuBar() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="MenuBar">
            <img src="/Logo.png" alt="Logo" />
            <Home className={location.pathname === '/home' ? 'active' : ''} onClick={() => navigate('/home')}/>
            <Document className={location.pathname === '/projects' ? 'active' : ''} onClick={() => navigate('/projects')}/>
            <Component className={location.pathname === '/components' ? 'active' : ''} onClick={() => navigate('/components')}/>
        </div>
    )
}

export default MenuBar
