import React from 'react'
import { Link } from 'react-router-dom'
import simon from '../../Assets/static/game-3.svg'
import styles from './footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.info}>
        <h1 className={styles.title}>TechStore</h1>
        <p className={styles.text}>
          This is an e-commerce where you can buy anything from computers to its components. It was made as the final project for
        <a href="https://www.soyhenry.com/"> Henry's Bootcamp </a>. The main tecnologies that we used are React.js and Redux.js for the Frontend, Supabase as Database and part of the Backend also with Node.js and Express.js.
        </p>
      </div>
      <div className={styles.routes}>
        <div className={styles.links}>
          <Link className={styles.link} to='/about'>About Us</Link>
          <Link className={styles.link} to='/points'>Points</Link>
        </div>
        <div className={styles.game}>
          <Link to='/videogame' className={styles.link} >Play Simon Says and earn discount points!</Link>
          <Link to='/videogame' className={styles.image}>
            <img className={styles.icon} src={simon} alt='videogame' />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer

