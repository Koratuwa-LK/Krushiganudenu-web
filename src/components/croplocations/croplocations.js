import React, { Component } from 'react';
import styles from './croplocations.module.css';
import { Button, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import axios from 'axios';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import env from '../../keys/env.js';

class Croplocations extends Component {

    googleMapRef = React.createRef()

    state={
        trips: [],
        show: false,
        find: '',
        lat: 6.0558904,
        lng: 80.1769774,
        croplist : [{lat: 7.9117496 ,lng: 81.0460577, vege: 'potato', title: 'Hashan-potato-80kg'},{lat: 6.0558904,lng: 80.1769774, title: 'beet', vege: 'beet'}]
    }

    render () {


        return (
            <div className={styles.main}>
           


                    
                    <div  className={styles.googlebox1} >
                    <Map
          google={this.props.google}
          zoom={8}
          style={{height:600, width: 'auto' ,borderRadius: 10, padding: 40}}
        // className={styles.googleboxinner}
          initialCenter={{ lat: this.state.lat, lng: this.state.lng}}
        >
       {/* {this.state.croplist.map(crop => {{ crop.vege == 'potato' ? <Marker title={crop.title} style={{color: 'green'}} icon={{ url: 'https://i.imgur.com/QkpL7jq.png' }} position={{ lat: crop.lat, lng: crop.lng}} />  :  <Marker title={crop.title} style={{color: 'green'}} icon={ require ('../../assets/pointers/potato.png') } position={{ lat: crop.lat, lng: crop.lng}} /> } */}
{this.state.croplist.map(crop => { if(crop.vege == 'potato') {
    return <Marker title={crop.title} style={{color: 'green'}} icon={{ url: 'https://i.imgur.com/QkpL7jq.png' }} position={{ lat: crop.lat, lng: crop.lng}} />
}else {
    return <Marker title={crop.title} style={{color: 'green'}} icon={ require ('../../assets/pointers/potato.png') } position={{ lat: crop.lat, lng: crop.lng}} />
}}
        
        )} 
        
        {/* <Marker icon={{ url: 'https://i.imgur.com/QkpL7jq.png' }} position={{ lat: this.state.lat, lng: this.state.lng}} /> */}
         
        
        </Map> 
        </div>


        


            
            </div>

            
        )
    }
}

export default GoogleApiWrapper({
    apiKey: env.googleapiKeyworking
  })(Croplocations);