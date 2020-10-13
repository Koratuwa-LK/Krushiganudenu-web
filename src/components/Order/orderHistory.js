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




function OrderHistory() {

    const [orders, setOrders] = useState({ orderList: [] })
    const [open, setOpen] = React.useState(false);
    const [orderToBeDeleted, setOrderToBeDeleted] = React.useState(null);

    useEffect(() => {

        let uid = firebase.auth().currentUser.uid
        //let uid = 'doXDSv87z0WcampS5YZ7a4Shf6s2'

        firebase.database().ref('orders').on('value', (snapshot) => {
            var Custorders = snapshot.val();

            const tempOrders = [];


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




        }
        )



    }, [])


    function deleteOrder(orderId) {
        console.log(orderId)
        setOrderToBeDeleted(orderId)
        handleClickOpen();
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseandDelete = () =>{
        setOpen(false);
        console.log(orderToBeDeleted)
        async function dltOrder(){
            //admin.ref(`/users/${userid}`).remove()
            await firebase.database().ref(`orders/${orderToBeDeleted}`).remove()
        }

        dltOrder();
        setOpen(false);
    }


    return (

        <div className="main">
            <div className="box">
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Do You Want to Delete the Order?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Deleting this order will result the loss of the particular order record.
          </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                     </Button>
                        <Button onClick={handleCloseandDelete} color="secondary" autoFocus>
                            Ok
                    </Button>
                    </DialogActions>
                </Dialog>
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


                                                    <Grid item xs={12} align="center" style={{ marginTop: "5px" }}>
                                                        <Button
                                                            variant="outlined"
                                                            color="secondary"
                                                            size='small'
                                                            startIcon={<DeleteIcon />}
                                                            onClick={() => deleteOrder(val.orderId)}
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

