import React, { Component } from 'react';
import styles from './landing.module.css';
import img from '../../assets/svg 1.png';

class Landing extends Component {
    render () {
        return (
            <div className={styles.main}>
            <div className={styles.hold}>
            <img src={img}></img>
            </div>
            <nav>
                <ul className={styles.navlinks}>
                    <li>HOME</li>
                    <li>MARKETPLACE</li>
                    <li>ABOUT US</li>
                </ul>
            </nav>

            <div className={styles.slug}>
            <h1>KRUSHIGANUDENU.LK</h1>
            <p>krushiganudenu krushiganudenu krushiganudenu krushiganudenu krushiganudenu krushiganudenu</p>
            </div>

            <div className={styles.btn}>
            <h4><a href="/">SIGN IN</a></h4>
            </div>
            </div>
        )
    }
}

export default Landing;