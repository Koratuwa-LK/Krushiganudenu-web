import React, { Component } from 'react';
import { Grid, TextField, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import styles from './croplocations.module.css';
import axios from '../../stocks-list.js';

class Cropsfiller extends Component {

    state = {
        name: '',
        lat: 0,
        lng: 0,
        crop: '',
        size: 0
    }

    handleChange(event) {
        this.setState({
            crop: event.target.value
        })
    }

    handleChangename(event) {
        this.setState({
            name: event.target.value
        })
    }

    handleChangelat(event) {
        this.setState({
            lat: event.target.value
        })
    }

    handleChangelng(event) {
        this.setState({
            lng: event.target.value
        })
    }

    handleChangecrop(event) {
        this.setState({
            crop: event.target.value
        })
    }

    handleChangesize(event) {
        this.setState({
            size: event.target.value
        })
    }




    post () {
        axios.post('/cropslocations.json', {
            crop: this.state.crop,
            lat: parseFloat(this.state.lat),
            lng: parseFloat(this.state.lng),
            name: this.state.name,
            size: this.state.size,
        })
        .then(response => {
            console.log(response.data)
        }).catch(er => {
            console.log(er)
        })
    }

    render () {
        return (
            <Grid container justify="center" spacing={2}>
        <Grid item xs={12} sm={6}>
        <div className={styles.tile}>
        <h4>Fill out the request</h4>
        <TextField
        value={this.state.name}
        onChange={this.handleChangename.bind(this)} className={styles.textfield} variant="filled" required label="Name" placeholder="Name" />
        <br/>
        <TextField
        value={this.state.lat}
        onChange={this.handleChangelat.bind(this)} className={styles.textfield} variant="filled" required label="Lat" placeholder="Lat" />

        <br/>

        <TextField
        value={this.state.lng}
        onChange={this.handleChangelng.bind(this)} className={styles.textfield} variant="filled" required label="Lng" placeholder="Lng" />

        <br/>
        
        <InputLabel className={styles.label} id="demo-simple-select-label">Vegetable</InputLabel>
          <Select
            className={styles.select}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.crop}
            onChange={this.handleChange.bind(this)}
          >

          <MenuItem value={'no filter'}>No filter (සියල්ල)</MenuItem>
          <MenuItem value={'Potato'}>Potato (අල)</MenuItem>
          <MenuItem value={'Beet'}>Beet (බීට්)</MenuItem>
          <MenuItem value={'Carrot'}>Carrot (කැරට්)</MenuItem>
          <MenuItem value={'Pumpkin'}>Pumpkin (වට්ටක්කා)</MenuItem>
          <MenuItem value={'Cabbage'}>Cabbage (ගෝවා)</MenuItem>
          <MenuItem value={'Brinjal'}>Brinjal (වම්බටු)</MenuItem>
          <MenuItem value={'Beans'}>Beans (බෝංචි)</MenuItem>
          <MenuItem value={'Tomato'}>Tomato (තක්කාලි)</MenuItem>
          <MenuItem value={'Chili'}>Chili (මිරිස්)</MenuItem>
         
          </Select>
        <br/>

        
        <TextField
        value={this.state.size}
        onChange={this.handleChangesize.bind(this)} className={styles.textfield} variant="filled" required label="Size" placeholder="Size" />

        <br/>
        <Button color="green" onClick={() => {this.post()}}>post</Button>
        </div>
        </Grid>
        </Grid>
        )
    }
}

export default Cropsfiller;