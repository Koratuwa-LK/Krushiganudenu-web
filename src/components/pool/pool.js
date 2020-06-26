import React, { Component } from 'react';
import axios from '../../stocks-list';
import styles from './pool.module.css';

let poolsize = 0
let avgprice = 0
class Pool extends Component {

    state = {
        requests: [],
        poolsize: 0,
        price: 0,
        count: 0,
        mainblock : {
            "Beet": {
                poolsize: 0,
                price: 0,
                count: 0
            },
            
            "Cabbage": {
                poolsize: 0,
                price: 0,
                count: 0
            },

            "Potato": {
                poolsize: 0,
                price: 0,
                count: 0
            },

            "Lettuce": {
                poolsize: 0,
                price: 0,
                count: 0           
            }
        }
    }

    componentDidMount() {
        axios.get('/requests.json')
        .then(response => {
            console.log(response.data)
            
            const request = []
            const obj = response.data
            var sizet = 0
            var pricet = 0
            var counter = 0
            var crop = ''

            for (let key in obj) {
                request.push({
                    id: key,
                    vege: obj[key].vege,
                    size: obj[key].size,
                    price: obj[key].price,
                    buyer: obj[key].buyer,
                    eco_centre: obj[key].eco_centre,
                    buyer_location: obj[key].buyer_location,
                    shipping: obj[key].shipping
                })
                sizet = sizet + obj[key].size
                pricet = pricet + parseInt(obj[key].price)
                counter = counter + 1
                crop = obj[key].vege

                this.setState(prevState => {
                    let mainblock = Object.assign({}, prevState.mainblock);
                    let prevsize = mainblock[crop].poolsize
                    let prevprice = mainblock[crop].price
                    let prevcount = mainblock[crop].count
                    mainblock[crop].poolsize =  prevsize + obj[key].size;
                    mainblock[crop].price =  prevprice + parseInt(obj[key].price);
                    mainblock[crop].count = prevcount + 1
                    return { mainblock }
                })
            }
            this.setState({
                requests: request,
                poolsize: sizet,
                price: pricet,
                count: counter,
            })

            
        }).catch(err => {
            console.log(err)
        })

        let whole = this.state.requests
/* 
        for(let req in whole) {
            this.setState({
                poolsize: this.state.poolsize + req.size
            })
        } */
    }

    render () {
        return (
            <div>
                <h1>POOL</h1>

                {poolsize != 0 ? <h2>{poolsize}</h2> : null}

                {avgprice != 0 ? <h2>{avgprice}</h2> : null}

               {/*  {this.state.requests.map(req => {
                    return <div><h2>{req.vege}</h2><h2>{req.size}</h2><h2>{req.price}</h2></div>
                })} */}

              

                <div className={styles.tile}>
                <h2>Beet</h2>
                <div style={{display:'flex'}}><h4>pool total need (kg) -  </h4><h3>{this.state.mainblock.Beet.poolsize / 2} kg</h3>
                </div>
                <br/>
                <div style={{display:'flex'}}><h4>avg asking price (rs) -  </h4><h3>{this.state.mainblock.Beet.price / this.state.mainblock.Beet.count} rs</h3>
                </div>
                </div>

                <div className={styles.tile}>
                <h2>Potato</h2>
                <div style={{display:'flex'}}><h4>pool total need (kg) -  </h4><h3>{this.state.mainblock.Potato.poolsize / 2} kg</h3>
                </div>
                <br/>
                <div style={{display:'flex'}}><h4>avg asking price (rs) -  </h4><h3>{this.state.mainblock.Potato.price / this.state.mainblock.Potato.count} rs</h3>
                </div>
                </div>
                

                {/* <Grid container>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {this.state.veges.map((value) => ( 
            <Grid key={value} item>
            {this.state.vege == value.vege || this.state.vege == '' ?
              <Paper style={{height: 530, backgroundColor: '#bef092',
    width: 300}} > <img style={{height: 280, width: 300, objectFit: 'cover'}} src={value.img}></img>
    <div style={{padding: 10}}>
        <h4>{value.vege}</h4>
        <h5>{value.size}kg</h5>
        <h5>{value.seller}</h5>
        <h5>{value.eco_centre}</h5>
        <div style={{display: 'flex'}}>
       <Button variant="outlined" color="primary">
  details
</Button>
<Button onClick={()=> this.handlenav(value.vege,value.size, value.img, value.seller, value.eco_centre)} variant="outlined" color="secondary">
  buy
</Button></div>
    </div>
     </Paper> : null }
            </Grid>
          ))}
        </Grid>
      </Grid>
      </Grid> */}


            </div>
        )
    }
}

export default Pool;