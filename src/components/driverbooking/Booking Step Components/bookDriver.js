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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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
    const [cropType, setCropType] = useState(null);
    const [buyerName,setBuyerName] = useState(null)

    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log(date.toString().substring(16, 21))
        localStorage.setItem('time', date.toString().substring(16, 21))
    };

    const handleChange = (e) => {
        setPhone("+94" + e.target.value)
    }

    const handleChangeCropType = (e) => {
        // setEcoCenter(event.target.value);
        setCropType(e.target.value)
        console.log(e.target.value)
    }

    const handleChangeBuyerName = (e) =>{
        setBuyerName(e.target.value)
        console.log(e.target.value)
    }

    function bookDriver() {
        if (phone == "+94" || phone == null) {
            alert("Please Enter Your Contact No")
        }
        else if (phone.length != 12) {
            alert("Invalid Phone Number")
        } else if (selectedDate == null) {
            alert("Please select the Pick Up time")
        } else {
            firebase.database().ref('farmerbookings/').push({
                drivername: localStorage.getItem('first_name'),
                farmernumer: phone,
                lat: parseFloat(localStorage.getItem('lat')),
                lng: parseFloat(localStorage.getItem('lng')),
                time: localStorage.getItem('time'),
                crop:cropType,
                farmername:buyerName
            },
                err => {
                    if (err) {
                        console.log(err)
                    }

                    else {
                        alert('You Have Requested the Driver ' + localStorage.getItem('first_name'))
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
        <div style={{ marginLeft: '80px', marginRight: '80px', marginBottom: '40px' }}>

            <Grid container justify="center">
                <div width="140px">
                    <InputLabel id="demo-simple-select-label">Select Crop Type</InputLabel>
                    <Select
                        fullWidth

                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={cropType}
                        onChange={handleChangeCropType}

                    >
                        <MenuItem value='Potato'>Potato (අල)</MenuItem>
                        <MenuItem value='Beans'>Beans (බෝංචි)</MenuItem>
                        <MenuItem value='Carrot'>Carrot (කැරට්)</MenuItem>
                        <MenuItem value='Pumpkin'>Pumpkin (වට්ටක්කා)</MenuItem>
                        <MenuItem value='Chilli'>Chilli (මිරිස්)</MenuItem>
                        <MenuItem value='Cabbage'>Cabbage (ගෝවා)</MenuItem>
                        <MenuItem value='Brinjal'>Brinjal (වම්බටු)</MenuItem>
                        <MenuItem value='Tomato'>Tomato (තක්කාලි)</MenuItem>

                    </Select>
                </div>



            </Grid>
            <Grid container justify="center" style={{margin:"10px"}}>
                <TextField id="standard-basic" label="Your Name" onChange={handleChangeBuyerName}/>
            </Grid>


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