import React, { Component } from 'react'
import styles from './checkout.module.css';

class Checkout extends Component {
    render () {
        return (
            <div>
                <h1>CHECKOUT</h1>

                

                <div className={styles.checkout}>
                <div className={styles.tile}>
                <img style={{height: 400, width: 400, objectFit: 'cover'}} src={this.props.location.state.img}>
                </img>
                <h4>{this.props.location.state.vege}</h4>
                <h4>{this.props.location.state.size}</h4>
                </div>
                </div>

                
            </div>
            
        )
    }
}

export default Checkout;