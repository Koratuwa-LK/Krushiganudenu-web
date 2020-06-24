import React, { Component } from 'react'
import styles from './checkout.module.css';
import Slider from '@material-ui/core/Slider';
import { Button, TextField } from '@material-ui/core';
import moment from 'moment';

class Checkout extends Component {

    state = {
        size : 10,
        buyer: '',
        location: '',
        
    }

    handleChange = (event, freshval) => {
        this.setState({
            size: freshval
        })
    }

    handleChangebuyer (event) {
        this.setState({
            buyer: event.target.value
        })
    }

    handleChangelocation (event) {
        this.setState({
            location: event.target.value
        })
    }

    valuetext(value) {
        return `${value}°C`;
      }

    checkout () {
        console.log(
            this.props.location.state.vege,
            this.state.size,
            this.props.location.state.seller,
            this.props.location.state.eco_centre,
            this.state.buyer,
            this.state.location,
            moment().format('MMMM Do YYYY, h:mm:ss a')
        )
    }

    render () {
        return (
            <div>
                <h1>CHECKOUT</h1>

                

                <div className={styles.checkout}>
                <div className={styles.tile}>
                <img style={{height: 400, width: 400, objectFit: 'cover'}} src={this.props.location.state.img}>
                </img>
                <h4>{this.props.location.state.vege}</h4>
                <h4>{this.props.location.state.seller}</h4>
                <h4>{this.props.location.state.eco_centre}</h4>
                <h4>stock {this.props.location.state.size}kg</h4>
                <h5>size <span>{this.state.size}</span>(kg)</h5>
                <div className={styles.slider}>
                
                <Slider
        defaultValue={30}
        getAriaValueText={this.valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        onChange={this.handleChange}
        marks
        min={10}
        max={this.props.location.state.size}
      />
      </div>
       <div className={styles.textfield}>
      <TextField required label="Name" defaultValue="name" onChange={this.handleChangebuyer.bind(this)} value={this.state.buyer} />
      <br/>
      <TextField required label="Location" defaultValue="location" onChange={this.handleChangelocation.bind(this)} value={this.state.location}/>
      </div>

      <Button variant="contained" onClick={() => {this.checkout()}} color="primary">
  checkout
</Button>
                </div>
                </div>

                
            </div>
            
        )
    }
}

export default Checkout;