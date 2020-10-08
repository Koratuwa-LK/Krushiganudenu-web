import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
} from '@material-ui/pickers';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebase from '../../../firebase';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
}));

const BookDriver = (props) => {

    const classes = useStyles();

    const [selectedDate, setSelectedDate] = React.useState(null);
    const [phone, setPhone] = useState(null)

    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log(date.toString().substring(16, 21))
        localStorage.setItem('time', date.toString().substring(16, 21))
    };

    const handleChange = (e) => {
        setPhone("+94"+e.target.value)
    }

    function bookDriver(){
        if(phone=="+94" || phone==null){
            alert("Please Enter Your Contact No")
        }
        else if(phone.length!=12){
            alert("Invalid Phone Number")
        }else if(selectedDate==null){
            alert("Please select the Pick Up time")
        }else{
            firebase.database().ref('farmerbookings/').push({
                drivername:localStorage.getItem('first_name'),
                farmernumer:phone,
                lat:localStorage.getItem('lat'),
                lng:localStorage.getItem('lng'),
                time:localStorage.getItem('time')
            },
            err=>{
                if(err) {
                    console.log(err)
                }
    
                else{
                    alert('You Have Requested the Driver '+localStorage.getItem('first_name'))
                    localStorage.removeItem('lat')
                    localStorage.removeItem('lng')
                    localStorage.removeItem('time')
                    localStorage.removeItem('email')
                    localStorage.removeItem('maximam_weight_can_carry')
                    localStorage.removeItem('first_name')
                    localStorage.removeItem('last_name')
                    localStorage.removeItem('nearest_eco_center')
                    localStorage.removeItem('ecocenter')
                    localStorage.removeItem('vehicle_color')
                    localStorage.removeItem('nic_no')
                    props.handleCloseDriverModal();
                }
            }
            
            )
        }
        
    }


    return (
        <div style={{ margin: '80px' }}>
            <TextField
                label="Enter Your Contact Number"
                id="outlined-start-adornment"
                type="number"
                onChange={handleChange}
                className={clsx(classes.margin, classes.textField)}
                InputProps={{
                    startAdornment: <InputAdornment position="start">+94</InputAdornment>,
                }}

            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Set Pick Up Time"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>

            <Button variant="outlined" onClick={bookDriver} >
                Book Now
            </Button>

        </div>
    )
}

export default BookDriver