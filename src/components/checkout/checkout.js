import React, { Component } from 'react'
import styles from './checkout.module.css';
import Slider from '@material-ui/core/Slider';
import { Button, Modal, TextField } from '@material-ui/core';
import moment from 'moment';
import axios from '../../stocks-list.js';
import StorefrontIcon from '@material-ui/icons/Storefront';
import {golden} from '../../assets/icons8-star-96.png';

class Checkout extends Component {

    state = {
        size: 10,
        buyer: '',
        location: '',
        price: '',
        phone: '',
        showmessage: false,
        farmers: [],
        comments: []

    }

    componentDidMount () {
        this.setState({
            price: this.props.location.state.price
        })

        console.log(this.props.location.state.name)

        axios.get('/Farmers.json').then(response => {
            console.log(response.data)

            const comms = []
            const obj = response.data
            for(let key in obj) {
                if(obj[key].name.slice(1,3) == this.props.location.state.name.slice(1,3)){
                comms.push({
                    id: key,
                    name: obj[key].name,
                    comments: obj[key].reviews,
                    phone: obj[key].mobile,
                    ecocenter: obj[key].economiccenter
                })
            }
        }

            this.setState({farmers: comms})

            

            const tempcomments = []
            // const obj1 = {}
            /* for(let farmersname in comms){
                if (farmersname.name == this.props.location.state.name) {
                const obj1 = farmersname.comments
                for(let key in obj1) {
                    tempcomments.push({
                        id: key,
                        comment: obj1[key].comment,
                        name: obj1[key].name,
                        rating: obj1[key].rating
                    })
                }
            }
            } */


            /* var i;
            for(i=0; i<=3; i++) {
                if(this.state.farmers[i].name == this.props.location.state.name) {
                    const obj1 = this.state.farmers[i].comments
                    for(let key in obj1) {
                        tempcomments.push({
                            id: key,
                            comment: obj1[key].comment,
                            names: obj1[key].name,
                            rating: obj1[key].rating
                        })
                    }
                }
            }
 */
            console.log(this.state.farmers)

            const obj1 = this.state.farmers[0].comments
            for(let key in obj1) {
                tempcomments.push({
                    id: key,
                    comment: obj1[key].comment,
                    name: obj1[key].name,
                    rating: obj1[key].rating
                })
            }

            console.log(tempcomments)

            this.setState({comments: tempcomments})
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

            this.setState({
                showmessage: true
            })

    }

    closemessage = () => {
        this.setState({showmessage: false})
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
                            <TextField label="Price you ask (Rs)" defaultValue="Price you ask" onChange={this.handleChangeprice.bind(this)} value={this.state.price} InputLabelProps={{
                                style: {
                                    color: 'white'}}}/>
                            
                        </div>

                        {this.state.phone == '' || this.state.buyer == '' /* || this.state.price == '' */ ? <Button variant="contained" disabled>send buy request</Button> : <Button variant="contained" onClick={() => { this.checkout() }} color="primary">
                            send buy request
                        </Button>}



                        
                    </div>
                </div>

                                {this.state.showmessage ? <div><h2>Your request has been sent successfully for {this.state.size} kgs of {this.props.location.state.vege} </h2></div> : null}
                               <Modal aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description" style={{marginTop: 400, backgroundColor: 'white'}} open={this.state.showmessage}
        onClose={this.closemessage}><div className={styles.paper}><h2>Your request has been sent successfully for {this.state.size} kgs of {this.props.location.state.vege}</h2><br/>
        <h4>Seller(farmer) will contact you soon</h4>
        <br/>
        <h4>Discover more stocks while you wait </h4> <a href="/store" style={{color: 'green'}}><StorefrontIcon/></a>
        </div></Modal> 

        <div className={styles.commentsbox}>
            <h4 style={{textAlign: 'center', marginBottom: 6}}>Reviews for the farmer</h4>
                                {this.state.comments.map(comm => <div className={styles.tile1}>
                                    <h4>"{comm.comment}"</h4>{comm.rating == 5 ? <div style={{flexDirection: 'row', display: 'flex', textAlign: 'center', marginLeft: '20%'}}><img style={{height: 40, width: 40}} src={require('../../assets/icons8-star-96.png')}/><img style={{height: 40, width: 40}} src={require('../../assets/icons8-star-96.png')}/><img style={{height: 40, width: 40}} src={require('../../assets/icons8-star-96.png')}/><img style={{height: 40, width: 40}} src={require('../../assets/icons8-star-96.png')}/><img style={{height: 40, width: 40}} src={require('../../assets/icons8-star-96.png')}/></div> : null }{comm.rating == 4 ? <div style={{flexDirection: 'row', display: 'flex', textAlign: 'center', marginLeft: '20%'}}><img style={{height: 40, width: 40}} src={require('../../assets/icons8-star-96.png')}/><img style={{height: 40, width: 40}} src={require('../../assets/icons8-star-96.png')}/><img style={{height: 40, width: 40}} src={require('../../assets/icons8-star-96.png')}/><img style={{height: 40, width: 40}} src={require('../../assets/icons8-star-96.png')}/></div> : null }{comm.rating == 3 ? <div style={{flexDirection: 'row', display: 'flex', textAlign: 'center', marginLeft: '20%'}}><img style={{height: 40, width: 40}} src={require('../../assets/icons8-star-96.png')}/><img style={{height: 40, width: 40}} src={require('../../assets/icons8-star-96.png')}/><img style={{height: 40, width: 40}} src={require('../../assets/icons8-star-96.png')}/></div> : null }{comm.rating == 2 ? <div style={{flexDirection: 'row', display: 'flex', textAlign: 'center', marginLeft: '20%'}}><img style={{height: 40, width: 40}} src={require('../../assets/icons8-star-96.png')}/><img style={{height: 40, width: 40}} src={require('../../assets/icons8-star-96.png')}/></div> : null }{comm.rating == 1 ? <div style={{flexDirection: 'row', display: 'flex', textAlign: 'center', marginLeft: '20%'}}><img style={{height: 40, width: 40}} src={require('../../assets/icons8-star-96.png')}/></div> : null } <p>{comm.rating}/5 - {comm.name}</p></div>) }
        </div>

            </div>

        )
    }
}

export default Checkout;