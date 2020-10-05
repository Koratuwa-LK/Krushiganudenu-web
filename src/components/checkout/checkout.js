import React, { Component } from 'react'
import styles from './checkout.module.css';
import Slider from '@material-ui/core/Slider';
import { Button, TextField } from '@material-ui/core';
import moment from 'moment';
import axios from '../../stocks-list.js';

class Checkout extends Component {

    state = {
        size: 10,
        buyer: '',
        location: '',
        price: '',
        phone: ''

    }

    componentDidMount () {
        this.setState({
            price: this.props.location.state.price
        })
    }

    handleChange = (event, freshval) => {
        this.setState({
            size: freshval
        })
    }

    handleChangebuyer(event) {
        this.setState({
            buyer: event.target.value
        })
    }

    handleChangelocation(event) {
        this.setState({
            location: event.target.value
        })
    }

    handleChangeprice(event) {
        this.setState({
            price: event.target.value
        })
    }

    handleChangeprice(event) {
        this.setState({
            price: event.target.value
        })
    }

    handleChangephone(event) {
        this.setState({
            phone: event.target.value
        })
    }

    valuetext(value) {
        return `${value}°C`;
    }

    checkout() {
        console.log(
            this.props.location.state.vege,
            this.state.size,
            this.props.location.state.seller,
            this.props.location.state.eco_centre,
            this.state.buyer,
            this.state.location,
            moment().format('MMMM Do YYYY, h:mm:ss a')
        )

        axios.post('/orders.json', {
            Accept: false,  
            Buyer: this.state.buyer,
            BuyerId: "doXDSv87z0WcampS5YZ7a4Shf6s2", 
            CompleteOrder: false,
            Crop: this.props.location.state.vege,
            DeleteOrder: false, 
            economicCenter: this.props.location.state.eco_centre, 
            OrderDate: moment().format('MMMM Do YYYY'),
            DesiredPrice: this.state.price,
            Farmer: this.props.location.state.Farmer,
            Quantity: this.state.size,
            Reject: false,
            FarmerId: this.props.location.state.FarmerId,
            Mobile: this.state.phone
         })
            .then(response => {
                console.log(response.data)
            }).catch(err => {
                console.log(err)
            })

    }

    render() {
        console.log(this.props)
        return (
            <div>
                <h1 style={{marginBottom: 40}}>BUY REQUEST FORM</h1>



                <div className={styles.checkout}>
                    <div className={styles.tile}>
                        <img style={{ height: 368, width: 400, objectFit: 'cover', borderRadius: 10 }} src={this.props.location.state.img}>
                        </img>
                        <h4 style={{marginTop: 10}}>{this.props.location.state.vege}</h4>
                        <h4 style={{marginTop: 10}}>{this.props.location.state.seller}</h4>
                        <h4 style={{marginTop: 10}}>{this.props.location.state.eco_centre}</h4>
                        <h4 style={{marginTop: 10}}>Stock remaining {this.props.location.state.size}kg</h4>
                        <h5 style={{marginTop: 10}}>size <span>{this.state.size}</span>(kg)</h5>
                        <div className={styles.slider}>

                            <Slider
                                defaultValue={this.state.size}
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
                            <TextField required label="Name" defaultValue="name" onChange={this.handleChangebuyer.bind(this)} value={this.state.buyer} InputLabelProps={{
                                style: {
                                    color: 'white'}}}/>
                            <br />
                            <TextField required label="Phone number" defaultValue="Phone" onChange={this.handleChangephone.bind(this)} value={this.state.phone} InputLabelProps={{
                                style: {
                                    color: 'white'}}}/>
                            <br />
                            <TextField required label="Price you ask (Rs)" defaultValue="Price you ask" onChange={this.handleChangeprice.bind(this)} value={this.state.price} InputLabelProps={{
                                style: {
                                    color: 'white'}}}/>
                            
                        </div>

                        <Button variant="contained" onClick={() => { this.checkout() }} color="primary">
                            send buy request
                        </Button>
                    </div>
                </div>


            </div>

        )
    }
}

export default Checkout;