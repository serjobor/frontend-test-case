import React from 'react'
import UserInfo from '../UserInfo'

function Header() {
  return (
    <>
      <header className="header">
        <h1>🛒 Интернет-магазин</h1>
        <UserInfo/>
      </header>
    </>
  )
}

export default Header