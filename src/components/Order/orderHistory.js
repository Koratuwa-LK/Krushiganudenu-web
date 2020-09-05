import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import './orderHistory.css'
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import DeleteIcon from '@material-ui/icons/Delete';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import firebase from '../../firebase';
var moment = require('moment');



const useStyles = makeStyles({
    root: {
        width: 200,
        display: 'flex',
        alignItems: 'center',

    },
});




function OrderHistory() {

    const [orders, setOrders] = useState({ orderList: [] })

    useEffect(() => {

        //let uid = firebase.auth().currentUser.uid
        let uid = 'doXDSv87z0WcampS5YZ7a4Shf6s2'

        firebase.database().ref('orders').on('value', (snapshot) => {
            var Custorders = snapshot.val();

            const tempOrders = [];

            /* if(Custorders!=null){
                for (let key in Custorders) {
                    if (Custorders[key]['BuyerId'] === uid) {
                        tempOrders.push({
                            [key]:Custorders
                        })
                    }
                }
            } */

            for (let key in Custorders) {
                
                if (Custorders[key]['BuyerId'] === uid) {
                    tempOrders.push({
                        orders: Custorders[key],
                        orderId: key
                    })
                }
                
            }

            setOrders({
                orderList: tempOrders
            })


            /* for (let key in Custorders) {
                if (Custorders[key]['BuyerId'] === uid) {
                    tempOrders.push({
                        [key]: Custorders[key]
                    })
                }
            }

            console.log(tempOrders)
            setOrders(tempOrders)


            setTimeout(() => {
                console.log(orders)
            }, 3000) */

        }
        )



    }, [])




    return (

        <div className="main">
            <div className="box">
                <Grid container spacing={5}
                    direction="row"
                    justify="center"
                    alignItems="center">


                    <Grid item xs={10} align="center">
                        <h2>Order History</h2>
                    </Grid>
                    <div style={{ marginTop: '5px' }}>
                        <Grid item xs={12} align="left" >
                            {
                                orders.orderList.map(val => {
                                    return (
                                        <div key={val.orderId}>

                                            <Card variant="outlined" style={{ marginBottom: "10px" }}>
                                                <CardContent>

                                                    <Typography variant="body2" component="p">
                                                        OrderId : {val.orderId}
                                                    </Typography>
                                                    <Typography variant="body2" component="p">
                                                        Crop Type: {val.orders.Crop}
                                                    </Typography>
                                                    <Typography variant="body2" component="p">
                                                        Farmer: {val.orders.Farmer}
                                                    </Typography>
                                                    <Typography variant="body2" component="p">
                                                        FarmerId: {val.orders.FarmerId}
                                                    </Typography>
                                                    <Typography variant="body2" component="p">
                                                        Mobile: {val.orders.Mobile}
                                                    </Typography>
                                                    <Typography variant="body2" component="p">
                                                        Price: {val.orders.Price}
                                                    </Typography>
                                                    <Typography variant="body2" component="p">
                                                        Quantity: {val.orders.Quantity}
                                                    </Typography>
                                                    <Typography variant="body2" component="p">
                                                        economicCenter: {val.orders.economicCenter}
                                                    </Typography>
                                                    

                                                 <Grid item xs={12} align="center" style={{marginTop:"5px"}}>
                                                 <Button
                                                        variant="outlined"
                                                        color="secondary"
                                                        size='small'
                                                        startIcon={<DeleteIcon />}
                                                        
                                                    >
                                                        Delete
                                                 </Button>
                                                 </Grid>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    )
                                })
                            }

                        </Grid>

                    </div>

                </Grid>
            </div>
        </div>

    )
}



export default OrderHistory

