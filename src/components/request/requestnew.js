import React, { Component } from 'react';
import { Grid, TextField, Select, MenuList, MenuItem, InputLabel, Slider, RadioGroup, FormControlLabel, Radio, Button, FormControl } from '@material-ui/core';
import styles from './request.module.css';
import axios from '../../stocks-list';
import firebase from '../../firebase';

class Requestnew extends Component {

    state= {
        vege: '',
        size: '',
        max: '',
        min: '',
        user: ''
    }

    componentDidMount() {
        this.setState({
            user: firebase.auth().currentUser.uid
        })
    }

    handleChangevege (event) {
        this.setState({
            vege: event.target.value
        })
    }

    handleChangesize (event) {
        this.setState({
            size: event.target.value
        })
    }

    handleChangemax (event) {
        this.setState({
            max: event.target.value
        })
    }

    handleChangemin (event) {
        this.setState({
            min: event.target.value
        })
    }

    submit () {
        axios.post('/sub.json', {
            BuyerId: this.state.user,
            crop: this.state.vege,
            maxPrice: this.state.max,
            minPrice: this.state.min,
            quantity: this.state.size
        })
    }

    render () {
        return (
            <div>
                <Grid container justify="center" spacing={2}>
        <Grid item xs={12} sm={6}>
        <div className={styles.tile}>
        <h4 style={{marginBottom: 40}} >Fill out the request</h4>
        <FormControl className={styles.formControl} >
         <InputLabel id="demo-simple-select-label">Select the crop type</InputLabel>
        
        <Select
        // variant="filled"
        className={styles.select}
        label="Select the crop type"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={this.state.vege}
          onChange={this.handleChangevege.bind(this)}
         
         
        >
          <MenuItem value={'Potato (අල)'}>Potato (අල)</MenuItem>
          <MenuItem value={'Beet (බීට්)'}>Beet (බීට්)</MenuItem>
          <MenuItem value={'Carrot (කැරට්)'}>Carrot (කැරට්)</MenuItem>
          <MenuItem value={'Pumpkin (වට්ටක්කා)'}>Pumpkin (වට්ටක්කා)</MenuItem>
          <MenuItem value={'Cabbage (ගෝවා)'}>Cabbage (ගෝවා)</MenuItem>
          <MenuItem value={'Brinjal (වම්බටු)'}>Brinjal (වම්බටු)</MenuItem>
          <MenuItem value={'Beans (බෝංචි)'}>Beans (බෝංචි)</MenuItem>
          <MenuItem value={'Tomato (තක්කාලි)'}>Tomato (තක්කාලි)</MenuItem>
          <MenuItem value={'Chili (මිරිස්)'}>Chili (මිරිස්)</MenuItem>
          
        </Select>

        <TextField value={this.state.min} onChange={this.handleChangemin.bind(this)} label="MIN PRICE" ></TextField>
        <TextField value={this.state.max} onChange={this.handleChangemax.bind(this)} label="MAX PRICE" ></TextField>
        <TextField value={this.state.size} onChange={this.handleChangesize.bind(this)} label="QUANTITY" ></TextField>
        <Button style={{marginTop: 10}} onClick={() => {this.submit()}} variant="contained">submit</Button>
        </FormControl>
        </div>
        </Grid>
        </Grid>
            </div>
        )
    }
}

export default Requestnew