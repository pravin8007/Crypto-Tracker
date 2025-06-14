import React from 'react'
import './styles.css'
import AnchorTemporaryDrawer from './drawer'
import Button from '../Button'
import { Link } from 'react-router-dom'
import ThemeToggleButton from '../../Theme/ThemeToggleButton'

function Header() {
  return (
    <div className='navbar'>
      <Link to="/" className='navigate'>
        <h1 className='logo'>CryptoTracker<span style={{ color: "var(--blue)" }}>.</span></h1>
      </Link>
      <div className='links'>
        <div className='toggle-btn'><ThemeToggleButton /></div>
        <Link to="/" className='link'>Home</Link>
        <Link to="/compare" className='link'>Compare</Link>
        <Link to="/dashboard" className='link'>
          <Button text={"Dashboard"} />
        </Link>
      </div>
      <div className='mobile-drawer'>
        <AnchorTemporaryDrawer />
      </div>
    </div>
  )
}

export default Header
