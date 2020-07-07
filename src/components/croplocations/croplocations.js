import React, { Component } from 'react';
import styles from './croplocations.module.css';
import { Button, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import env from '../../keys/env.js';

import axios from '../../stocks-list.js';

class Croplocations extends Component {

    googleMapRef = React.createRef()

    state={
        trips: [],
        show: false,
        find: '',
        lat: 6.0558904,
        lng: 80.1769774,
        croplist : [{lat: 7.9117496 ,lng: 81.0460577, vege: 'potato', title: 'Hashan-potato-80kg'},{lat: 6.0558904,lng: 80.1769774, title: 'beet', vege: 'beet'}],
        croplistfinl: []
    }

    componentDidMount() {
        axios.get('/cropslocations.json')
        .then(response => {
            console.log(response.data)
            
            const request = []
            const obj = response.data
            
            for (let key in obj) {
                request.push({
                    id: key,
                    crop: obj[key].crop,
                    size: obj[key].size,
                    name: obj[key].name,
                    lat: obj[key].lat,
                    lng: obj[key].lng
                })
            }
            this.setState({
                croplistfinl: request
            })
        }).catch(er => {
            console.log(er)
        })
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
{this.state.croplistfinl.map(crop => { if(crop.crop == 'Potato') {
    return <Marker title={crop.name + '-' + crop.crop + '-' + crop.size + 'kg'} style={{color: 'green'}} icon={require ( '../../assets/pointers/potato.png') } position={{ lat: crop.lat, lng: crop.lng}} />
}if(crop.crop == 'Beet'){
    return <Marker title={crop.name + '-' + crop.crop + '-' + crop.size + 'kg'} style={{color: 'green'}} icon={ require ('../../assets/pointers/beetpointers.png') } position={{ lat: crop.lat, lng: crop.lng}} />
}if(crop.vege == 'Brinjal'){
    return <Marker title={crop.name + '-' + crop.crop + '-' + crop.size + 'kg'} style={{color: 'green'}} icon={ require ('../../assets/pointers/brinjl.png') } position={{ lat: crop.lat, lng: crop.lng}} />
}if(crop.vege == 'Carrot'){
    return <Marker title={crop.name + '-' + crop.crop + '-' + crop.size + 'kg'} style={{color: 'green'}} icon={ require ('../../assets/pointers/crot.png') } position={{ lat: crop.lat, lng: crop.lng}} />
}if(crop.vege == 'Tomato'){
    return <Marker title={crop.name + '-' + crop.crop + '-' + crop.size + 'kg'} style={{color: 'green'}} icon={ require ('../../assets/pointers/potato.png') } position={{ lat: crop.lat, lng: crop.lng}} />
}if(crop.vege == 'Beans'){
    return <Marker title={crop.name + '-' + crop.crop + '-' + crop.size + 'kg'} style={{color: 'green'}} icon={ require ('../../assets/pointers/potato.png') } position={{ lat: crop.lat, lng: crop.lng}} />
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