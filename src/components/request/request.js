import React, { Component } from 'react';
import styles from './request.module.css';
import { Grid, TextField, Select, MenuList, MenuItem, InputLabel, Slider, RadioGroup, FormControlLabel, Radio, Button } from '@material-ui/core';

class Request extends Component {

    state = {
        name: '',
        size: '',
        eco_centre: '',
        vege: '',
        location: '',
        shipping: ''
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



    request() {
        console.log(this.state.name,
        this.state.size,
        this.state.eco_centre,
        this.state.vege,
        this.state.location,
        this.state.shipping)
    }


    render () {
        return (
            <div className={styles.main}>
            <h1>REQUEST STOCKS</h1>

           
        <Grid container justify="center" spacing={2}>
        <Grid item xs={12} sm={6}>
        <div className={styles.tile}>
        <h4>Fill out the request</h4>
        <TextField
        value={this.state.name}
        onChange={this.handleChangename.bind(this)} className={styles.textfield} filled required label="Name" placeholder="Name" />
        <br/>
        <TextField
        value={this.state.location}
        onChange={this.handleChangelocation.bind(this)} className={styles.textfield} multiline rows={4} outlined required label="Location" placeholder="Location" />

        <br/>

        <InputLabel className={styles.label} id="demo-simple-select-label">Vegetable</InputLabel>
        <Select
        className={styles.select}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={this.state.vege}
          onChange={this.handleChangevege.bind(this)}
        >
          <MenuItem value={'Beet'}>Beet</MenuItem>
          <MenuItem value={'Cabbage'}>Cabbage</MenuItem>
          <MenuItem value={'Potato'}>Potato</MenuItem>
          <MenuItem value={'Lettuce'}>Lettuce</MenuItem>
        </Select>

        <InputLabel className={styles.label} >Eco Centre</InputLabel>
        <Select
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
        step={50}
        onChange={this.handleChangesize}
        marks
        min={10}
        // max={this.props.location.state.size}
        max={1000}
      />

      <br/>
      <InputLabel className={styles.label} >Stock clearence method</InputLabel>
     
      <RadioGroup aria-label="gender" name="gender1" value={this.state.shipping} onChange={this.handleChangeshipping.bind(this)}>
        <FormControlLabel value="ship" control={<Radio />} label="Ship with cash on delivery" />
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