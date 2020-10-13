import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import './notification.css'
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import DeleteIcon from '@material-ui/icons/Delete';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import firebase from '../../firebase';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


var moment = require('moment');





const useStyles = makeStyles({
    root: {
        width: 200,
        display: 'flex',
        alignItems: 'center',

    },
});



function NotificationPriceMatching() {
    const classes = useStyles();

    const [notification, setNotification] = useState({ notificationList: [] })

    const [orders, setOrders] = useState({ orderList: [] })
    const [open, setOpen] = React.useState(false);
    const [orderToBeDeleted, setOrderToBeDeleted] = React.useState(null);

    useEffect(() => {
        const BuyerId = firebase.auth().currentUser.uid;


        let subscriptionlist;
        let tempsubscriptionList = [];
        let stockslist;
        let tempstockList = [];

        const subscriptions = firebase.database().ref("sub").orderByChild("BuyerId").equalTo(BuyerId);
        subscriptions.on('value', snapshot => {
            const subscriptionlist = snapshot.val();
            for (let key in subscriptionlist) {
                tempsubscriptionList.push(subscriptionlist[key])
            }
            const stocks = firebase.database().ref("Stocks");
            stocks.on('value', snapshot => {
                const stockslist = snapshot.val();
                for (let key in stockslist) {
                    tempstockList.push(stockslist[key])
                }
                const tempNotificationList = []

                tempsubscriptionList.map(sub => {
                    tempstockList.map(stock => {
                        if ((sub['crop']) == stock['crop'] && (parseInt(sub['maxPrice']) > parseInt(stock['price'])) && (parseInt(sub['minPrice']) < parseInt(stock['price'])) && (parseInt(sub['quantity']) <= parseInt(stock['quantity']))) {
                            tempNotificationList.push(stock)
                        }
                    })
                })
                setNotification({ notificationList: tempNotificationList })
            })

        })


    }, [])






    return (

        <div className="main">
            <div className="box">

                <Grid container spacing={5}
                    direction="row"
                    justify="center"
                    alignItems="center">


                    <Grid item xs={10} align="center">
                        <h2>Price Matching Notifications</h2>
                    </Grid>
                    <div style={{ marginTop: '5px' }}>
                        <Grid item xs={12} align="left" >
                            {
                                notification.notificationList.slice(0).reverse().map(val => {
                                    return (
                                        <div key={val.timestamp}>

                                            <Card variant="outlined" style={{ marginBottom: "10px",width:"400px" }}>
                                                <CardContent>

                                                    <Typography variant="h5" component="h2">
                                                        {val.crop}
                                                    </Typography>
                                                    <Typography variant="body2" component="p">
                                                        Farmer Name : {val.name}
                                                    </Typography>
                                                    <Typography variant="body2" component="p">
                                                        Eco Center : {val.economicCenter}
                                                    </Typography>
                                                    <Typography variant="body2" component="p">
                                                        Farmer Contact No : {val.phoneNum}
                                                    </Typography>
                                                    <Typography variant="body2" component="p">
                                                        Price : {val.price}
                                                    </Typography>
                                                    <Typography variant="body2" component="p">
                                                        Quantity : {val.quantity}
                                                    </Typography>




                                                    <Grid item xs={12} align="center" style={{ marginTop: "5px" }}>
                                                        {/*  <Button
                                                            variant="outlined"
                                                            color="secondary"
                                                            size='small'
                                                            startIcon={<DeleteIcon />}
                                                            onClick={() => deleteOrder(val.orderId)}
                                                        >
                                                            Delete
                                                 </Button> */}
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



export default NotificationPriceMatching

