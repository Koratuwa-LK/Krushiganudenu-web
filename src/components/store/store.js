import React, { Component, useState } from 'react';
import styles from './store.module.css';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import { withTranslation } from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import instance from '../../stocks-list';

class Store extends Component {



  state = {
    vege: '',

    veges: []
  }



  handleChange(event) {
    this.setState({
      vege: event.target.value
    })
    console.log(this.state.vege)
  }

  handlenav(vege1, size1, img1, seller1, eco_centre1) {

    this.props.history.push({
      pathname: '/checkout',
      state: {
        vege: vege1,
        size: size1,
        img: img1,
        seller: seller1,
        eco_centre: eco_centre1
      }

    })
  }

  componentDidMount() {


    instance.get('/stocks.json')
      .then(response => {
        for (let key in response.data) {
          console.log(response.data[key])

          const tempStock = [];
          for (let key in response.data) {
            tempStock.unshift(
              {
                ...response.data[key]
              }
            )
          }
          this.setState({ veges: tempStock })
        }

      })

    console.log(this.state)

  }

  render() {
    const { t } = this.props;

    return (
      <div className={styles.main}>
        <h1>{t('krushiganudenu')} {t('store')}</h1>

        <div className={styles.filters}>
          <InputLabel className={styles.label} id="demo-simple-select-label">{t('vegetabletype')}</InputLabel>
          <Select
            className={styles.select}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.age}
            onChange={this.handleChange.bind(this)}
          >
            {/* <MenuItem value={'Beet'}>Beet</MenuItem>
            <MenuItem value={'Cabbage'}>Cabbage</MenuItem>
            <MenuItem value={'Potato'}>Potato</MenuItem>
            <MenuItem value={'Lettuce'}>Lettuce</MenuItem> */}
            {
              this.state.veges.map((value) => {
                return <MenuItem value={value.vege}>{value.vege}</MenuItem>
              })
            }

          </Select>

          <InputLabel className={styles.label} >{t('ecocenter')}</InputLabel>
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
                    {this.state.vege === value.vege || this.state.vege === '' ?
                      <Paper style={{
                        height: 530, backgroundColor: '#bef092',
                        width: 300
                      }} > <img style={{ height: 280, width: 300, objectFit: 'cover' }} src={value.img}></img>
                        <div style={{ padding: 10 }}>
                          <h4>{value.vege}</h4>
                          <h5>{value.size}kg</h5>
                          <h5>{value.seller}</h5>
                          <h5>{value.eco_centre}</h5>
                          <div style={{ display: 'flex' }}>
                            <Button variant="outlined" color="primary">
                              {t('details')}
                            </Button>
                            <Button onClick={() => this.handlenav(value.vege, value.size, value.img, value.seller, value.eco_centre)} variant="outlined" color="secondary">
                              {t('buy')}
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

export default withTranslation()(Store);