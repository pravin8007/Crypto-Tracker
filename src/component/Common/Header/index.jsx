import React from 'react'
import './styles.css'
import AnchorTemporaryDrawer from './drawer'
import Button from '../Button'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='navbar'>
      <Link to="/" className='navigate'>
        <h1 className='logo'>CryptoTracker<span style={{ color: "var(--blue)" }}>.</span></h1>
      </Link>
      <div className='links'>
        <Link to="/" className='link'>Home</Link>
        <Link to="/compare" className='link'>Compare</Link>
        <Link to="/watchlist" className='link'>Watchlist</Link>
        <Link to="/dashboard" className='link'>
          <Button
            text={"Dashboard"}
            onClick={() => console.log("Btn clicked")} />
        </Link>
      </div>
      <div className='mobile-drawer'>
        <AnchorTemporaryDrawer />
      </div>
    </div>
  )
}

export default Header
