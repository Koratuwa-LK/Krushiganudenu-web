import React, { Component } from 'react';
import styles from './request.module.css';
import { Grid, TextField, Select, MenuList, MenuItem, InputLabel, Slider, RadioGroup, FormControlLabel, Radio, Button } from '@material-ui/core';
import axios from '../../stocks-list';

class Request extends Component {

    state = {
        name: '',
        size: '',
        eco_centre: '',
        vege: '',
        location: '',
        shipping: '',
        price: ''
    }

    handleChangename (event) {
        this.setState({
            name: event.target.value
        })
    }

    handleChangelocation (event) {
        this.setState({
            location: event.target.value
        })
    }

    handleChangevege (event) {
        this.setState({
            vege: event.target.value
        })
    }

    handleChangeshipping (event) {
        this.setState({
            shipping: event.target.value
        })
    }

    handleChangeeco_centre (event) {
        this.setState({
            eco_centre: event.target.value
        })
    }

    handleChangesize = (event, freshval) => {
        this.setState({
            size: freshval
        })
    }

    handleChangeprice (event) {
        this.setState({
            price: event.target.value
        })
    }

    



    request() {
        console.log(this.state.name,
        this.state.size,
        this.state.eco_centre,
        this.state.vege,
        this.state.location,
        this.state.shipping)

        axios.post('/requests.json', {vege: this.state.vege, size: this.state.size, price: this.state.price, buyer: this.state.name, eco_centre: this.state.eco_centre, buyer_location: this.state.location, shipping: this.state.shipping})


    }


    render () {
        return (
            <div className={styles.main}>
            <h1>REQUEST STOCKS</h1>
            <a href="/pool">CHECK THE POOL</a>

           
        <Grid container justify="center" spacing={2}>
        <Grid item xs={12} sm={6}>
        <div className={styles.tile}>
        <h4>Fill out the request</h4>
        <TextField
        value={this.state.name}
        onChange={this.handleChangename.bind(this)} className={styles.textfield} variant="filled" required label="Name" placeholder="Name" />
        <br/>
        <TextField
        value={this.state.location}
        onChange={this.handleChangelocation.bind(this)} className={styles.textfield} multiline rows={4} variant="filled" required label="Location" placeholder="Location" />

        <br/>

        <TextField
        value={this.state.price}
        onChange={this.handleChangeprice.bind(this)} className={styles.textfield} variant="filled" required label="Price you ask(rs)" placeholder="Price you ask" />

        <br/>

        <InputLabel className={styles.label} id="demo-simple-select-label">Vegetable</InputLabel>
        <Select
        variant="filled"
        className={styles.select}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={this.state.vege}
          onChange={this.handleChangevege.bind(this)}
        >
<<<<<<< HEAD
          <MenuItem value={'Potato'}>Potato (අල)</MenuItem>
          <MenuItem value={'Beet'}>Beet (බීට්)</MenuItem>
          <MenuItem value={'Carrot'}>Carrot (කැරට්)</MenuItem>
          <MenuItem value={'Pumpkin'}>Pumpkin (වට්ටක්කා)</MenuItem>
          <MenuItem value={'Cabbage'}>Cabbage (ගෝවා)</MenuItem>
          <MenuItem value={'Brinjal'}>Brinjal (වම්බටු)</MenuItem>
          <MenuItem value={'Beans'}>Beans (බෝංචි)</MenuItem>
          <MenuItem value={'Tomato'}>Tomato (තක්කාලි)</MenuItem>
          <MenuItem value={'Chili'}>Chili (මිරිස්)</MenuItem>
=======
          <MenuItem value={'Potato (අල)'}>Potato (අල)</MenuItem>
          <MenuItem value={'Beet (බීට්)'}>Beet (බීට්)</MenuItem>
          <MenuItem value={'Carrot (කැරට්)'}>Carrot (කැරට්)</MenuItem>
          <MenuItem value={'Pumpkin (වට්ටක්කා)'}>Pumpkin (වට්ටක්කා)</MenuItem>
          <MenuItem value={'Cabbage (ගෝවා)'}>Cabbage (ගෝවා)</MenuItem>
          <MenuItem value={'Brinjal (වම්බටු)'}>Brinjal (වම්බටු)</MenuItem>
          <MenuItem value={'Beans (බෝංචි)'}>Beans (බෝංචි)</MenuItem>
          <MenuItem value={'Tomato (තක්කාලි)'}>Tomato (තක්කාලි)</MenuItem>
          <MenuItem value={'Chili (මිරිස්)'}>Chili (මිරිස්)</MenuItem>
>>>>>>> 3ac7a3279c6e4de933cb66cbf3f0581f7acf4efe
          
        </Select>

        <InputLabel className={styles.label} >Eco Centre</InputLabel>
        <Select
        variant="filled"
        className={styles.select}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
            value={this.state.eco_centre}
            onChange={this.handleChangeeco_centre.bind(this)}
        >
          <MenuItem value={'eco 1'}>eco 1</MenuItem>
          <MenuItem value={'eco 2'}>eco 2</MenuItem>
        </Select>

        <br/>

        <InputLabel className={styles.label} >size (kg)</InputLabel>
     

        <Slider
        defaultValue={10}
        // getAriaValueText={this.valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={40}
        onChange={this.handleChangesize}
        marks
        min={10}
        // max={this.props.location.state.size}
        max={1000}
      />

      <br/>
      <InputLabel className={styles.label} >Stock clearence method</InputLabel>
     
      <RadioGroup aria-label="gender" name="gender1" value={this.state.shipping} onChange={this.handleChangeshipping.bind(this)}>
        <FormControlLabel value="ship" style={{color: 'black'}} control={<Radio />} label="Ship with cash on delivery" color="black"/>
        <FormControlLabel value="collect" control={<Radio />} label="Collect at the eco centre" />
        {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
        {/* <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
      </RadioGroup>

      <br/>

      <Button onClick={() => {this.request()}} variant="contained">make the request</Button>


        </div>
        </Grid>
        </Grid>
            </div>
            
        )
    }
}


export default Request;