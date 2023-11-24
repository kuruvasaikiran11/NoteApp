import React from 'react'
import styles from './Header.module.css'

export const Header = () => {
  return (
    <>
        <div className={styles.header}>
            <h1 className={styles.headingText}><i className="fa-solid fa-note-sticky"></i> Note-App</h1>
        </div>
    </>
  )
}

export default Header;