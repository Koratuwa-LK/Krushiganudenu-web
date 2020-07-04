import React, { Component, useState } from 'react';
import styles from './store.module.css';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import instance from '../../stocks-list';

class Store extends Component {

  state = {
    vege: '',

    veges: [],
    eco: ''
  }

  handleChange(event) {
    this.setState({
      vege: event.target.value
    })
    console.log(this.state.vege)
  }

  handleChangeeco(event) {
    this.setState({
      eco: event.target.value
    })
    console.log(this.state.vege)
  }

  handlenav(vege1, size1, img1, seller1, eco_centre1, FarmerId, Farmer, ) {

    this.props.history.push({
      pathname: '/checkout',
      state: {
        vege: vege1,
        size: size1,
        img: img1,
        eco_centre: eco_centre1,
        Farmer: seller1,
        FarmerId: FarmerId

      }

    })
  }

  componentDidMount() {
    
    instance.get('/Stocks.json')
      .then(response => {
        for(let key in response.data){
          console.log(response.data[key])
          
          const  tempStock = [];
          for(let key in response.data){
             tempStock.unshift(
               {
                 ...response.data[key]
               }
             )
          }
          this.setState({veges:tempStock})
        }
        
      })

      console.log(this.state)

  }

  reset () {
    this.setState({
      vege: '',
      eco: ''
    })
  }

  render() {
    return (
      <div className={styles.main}>
        <h1>KRUSHIGANUDENU STORE</h1>

        <div className={styles.filters}>
          <InputLabel className={styles.label} id="demo-simple-select-label">Vegetable</InputLabel>
          <Select
            className={styles.select}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.vege}
            onChange={this.handleChange.bind(this)}
          >
          <MenuItem value={'no filter'}>No filter (සියල්ල)</MenuItem>
          <MenuItem value={'Potato (අල)'}>Potato (අල)</MenuItem>
          <MenuItem value={'Beet (බීට්)'}>Beet (බීට්)</MenuItem>
          <MenuItem value={'Carrot (කැරට්)'}>Carrot (කැරට්)</MenuItem>
          <MenuItem value={'Pumpkin (වට්ටක්කා)'}>Pumpkin (වට්ටක්කා)</MenuItem>
          <MenuItem value={'Cabbage (ගෝවා)'}>Cabbage (ගෝවා)</MenuItem>
          <MenuItem value={'Brinjal (වම්බටු)'}>Brinjal (වම්බටු)</MenuItem>
          <MenuItem value={'Beans (බෝංචි)'}>Beans (බෝංචි)</MenuItem>
          <MenuItem value={'Tomato (තක්කාලි)'}>Tomato (තක්කාලි)</MenuItem>
          <MenuItem value={'Chili (මිරිස්)'}>Chili (මිරිස්)</MenuItem>
         
            
           {/*  {
              this.state.veges.map((value)=>{
                return <MenuItem value={value.crop}>{value.crop}</MenuItem>
              })
            } */}

          </Select>

          <InputLabel className={styles.label} >Eco Centre</InputLabel>
          <Select
            className={styles.select}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.eco}
            onChange={this.handleChangeeco.bind(this)}
          >
            <MenuItem value={'Meegoda'}>Meegoda</MenuItem>
            <MenuItem value={'Dambulla'}>Dambulla</MenuItem>
          </Select>

          <br/>

          <Button style={{marginTop: 10}} variant="contained" color="green" onPress={this.reset}>Reset Filters</Button>
        </div>

        <div className={styles.items}>

          <Grid container>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={2}>
                {this.state.veges.map((value) => (
                  <Grid key={value} item>
                    {this.state.vege === 'no filter' || this.state.vege.substring(0,5) === value.crop.substring(0,5) || (this.state.vege.substring(0,5) === value.crop.substring(0,5) && this.state.eco === value.economicCenter) || this.state.vege === '' ?
                      <Paper style={{
                        height: 530, backgroundColor: 'white',
                        width: 300
                      }} > <img style={{ height: 280, width: 300, objectFit: 'cover' }} src={value.image}></img>
                        <div style={{ padding: 10 }}>
                          <h4>{value.crop}</h4>
                          <h5>{value.quantity}kg</h5>
                          <h5>{value.name}</h5>
                          <h5>{value.economicCenter}</h5>
                          <div style={{ display: 'flex' }}>
                            <Button variant="outlined" color="primary">
                              details
</Button>
                            <Button onClick={() => this.handlenav(value.crop, value.quantity, value.image, value.name, value.economicCenter,  value.uid)} variant="outlined" color="secondary">
                              buy
</Button></div>
                        </div>
                      </Paper> : null}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

        </div>
      </div>
    )
  }
}

export default Store;