import React, { Component } from 'react';
import styles from './request.module.css';
import { Grid, TextField, Select, MenuList, MenuItem, InputLabel, Slider, RadioGroup, FormControlLabel, Radio, Button } from '@material-ui/core';

class Request extends Component {
    render () {
        return (
            <div className={styles.main}>
            <h1>REQUEST STOCKS</h1>

           
        <Grid container justify="center" spacing={2}>
        <Grid item xs={12} sm={6}>
        <div className={styles.tile}>
        <h4>Fill out the request</h4>
        <TextField className={styles.textfield} filled required label="Name" placeholder="Name" />
        <br/>
        <TextField className={styles.textfield} multiline rows={4} outlined required label="Location" placeholder="Location" />

        <br/>

        <InputLabel className={styles.label} id="demo-simple-select-label">Vegetable</InputLabel>
        <Select
        className={styles.select}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        //   value={this.state.age}
        //   onChange={this.handleChange.bind(this)}
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
        //   value={this.state.age}
        //   onChange={this.handleChange}
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
        // onChange={this.handleChange}
        marks
        // min={10}
        // max={this.props.location.state.size}
        max={1000}
      />

      <br/>
      <InputLabel className={styles.label} >Stock clearence method</InputLabel>
     
      <RadioGroup aria-label="gender" name="gender1" /* value={value} onChange={handleChange} */>
        <FormControlLabel value="female" control={<Radio />} label="Ship with cash on delivery" />
        <FormControlLabel value="male" control={<Radio />} label="Collect at the eco centre" />
        {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
        {/* <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
      </RadioGroup>

      <br/>

      <Button variant="contained">make the request</Button>


        </div>
        </Grid>
        </Grid>
            </div>
            
        )
    }
}


export default Request;