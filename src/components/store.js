import React, { Component, useState } from 'react';
import styles from './store.module.css';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

class Store extends Component {

    state = {
        vege: '',

        veges: [{
            vege: 'Cabbage',
            size: 100,
            img: 'https://images.heb.com/is/image/HEBGrocery/000374791',
            seller: 'fmer 1',
            eco_centre: 'eco 1'
        }, {
            vege: 'Potato',
            size: 80,
            img: 'https://assets.bonappetit.com/photos/5d7284758d926f0009df5cfc/5:4/w_3165,h_2532,c_limit/Basically-Gojuchang-Chicken-Potato.jpg',
            seller: 'fmer 2',
            eco_centre: 'eco 1'
        },{
            vege: 'Beet',
            size: 90,
            img: 'https://www.acouplecooks.com/wp-content/uploads/2019/10/Beet-Salad-001.jpg',
            seller: 'fmer 3',
            eco_centre: 'eco 2'
        },{
            vege: 'Lettuce',
            size: 90,
            img: 'https://cdn.britannica.com/77/170677-050-F7333D51/lettuce.jpg',
            seller: 'fmer 4',
            eco_centre: 'eco 2'
        },{
            vege: 'Lettuce',
            size: 90,
            img: 'https://cdn.britannica.com/77/170677-050-F7333D51/lettuce.jpg',
            seller: 'fmer 4',
            eco_centre: 'eco 2'
        }
    ]
    }

    handleChange (event) {
        this.setState({
            vege: event.target.value
        })
    }


    render () {
        return(
            <div className={styles.main}>
            <h1>KRUSHIGANUDENU STORE</h1>

            <div className={styles.filters}>
            <InputLabel className={styles.label} id="demo-simple-select-label">Vegetable</InputLabel>
        <Select
        className={styles.select}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={this.state.age}
          onChange={this.handleChange.bind(this)}
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
          value={this.state.age}
          onChange={this.handleChange}
        >
          <MenuItem value={'eco 1'}>eco 1</MenuItem>
          <MenuItem value={'eco 2'}>eco 2</MenuItem>
        </Select>
            </div>

            <div className={styles.items}>
            
            <Grid container>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {this.state.veges.map((value) => ( 
            <Grid key={value} item>
            {this.state.vege == value.vege || this.state.vege == '' ?
              <Paper style={{height: 450,
    width: 300}} > <img style={{maxHeight: 200, maxWidth: 300}} src={value.img}></img>
    <div style={{padding: 10}}>
        <h4>{value.vege}</h4>
        <h5>{value.size}kg</h5>
        <h5>{value.seller}</h5>
        <h5>{value.eco_centre}</h5>
        <div style={{display: 'flex'}}>
       <Button variant="outlined" color="primary">
  details
</Button>
<Button variant="outlined" color="secondary">
  buy
</Button></div>
    </div>
     </Paper> : null }
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